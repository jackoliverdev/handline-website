"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { createBlog, uploadBlogCoverImage } from "@/lib/blog-service";
import { ArrowLeft, Upload, X, Tag as TagIcon } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [previewTab, setPreviewTab] = useState("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };
  
  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const addTag = () => {
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Generate a temporary ID for the blog post
      const tempId = `temp-${Date.now()}`;
      
      const { url } = await uploadBlogCoverImage(tempId, file);
      
      if (url) {
        setImageUrl(url);
        toast({
          title: "Success",
          description: "Cover image uploaded successfully!"
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload cover image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !summary || !content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const blogData = {
        title,
        slug: slug || generateSlug(title),
        summary,
        content,
        tags,
        is_published: isPublished,
        author: "HandLine Team", // Default author, can be updated later
        image_url: imageUrl
      };
      
      const newBlog = await createBlog(blogData);
      
      toast({
        title: "Success",
        description: "Blog post created successfully!"
      });
      
      // Redirect to the blog list page
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render markdown preview
  const renderMarkdown = (content: string) => {
    return { __html: content };
  };
  
  const suggestedTags = [
    "heat resistant", "cut resistance", "safety standards", 
    "industrial safety", "PPE", "thermal protection", 
    "manufacturing", "innovation", "regulations",
    "compliance", "industry 4.0"
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/admin/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Blog Post</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          {/* Main content area - 4 columns */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>Write your blog post content here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter blog post title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="Enter URL slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      The URL-friendly version of the title. Leave blank to generate automatically.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Enter a short summary of your blog post"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Tabs
                      defaultValue="edit"
                      value={previewTab}
                      onValueChange={setPreviewTab}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit" className="p-0 border-0">
                        <Textarea
                          id="content"
                          placeholder="Write your content in Markdown format"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={15}
                          required
                          className="font-mono"
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="p-4 border rounded-md min-h-[300px] markdown-preview">
                        {content ? (
                          <div dangerouslySetInnerHTML={renderMarkdown(content)} />
                        ) : (
                          <p className="text-muted-foreground">Nothing to preview yet...</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - 2 columns */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication Settings</CardTitle>
                <CardDescription>Configure how your blog post appears.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full hover:bg-accent/80 p-0.5"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input
                        id="tag-input"
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addTag}
                        disabled={!currentTag.trim()}
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Suggested tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestedTags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => {
                              if (!tags.includes(tag)) {
                                setTags([...tags, tag]);
                              }
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="published">Published</Label>
                      <p className="text-xs text-muted-foreground">
                        Make this blog post visible to the public.
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Cover Image URL</Label>
                    <Input
                      id="image-url"
                      placeholder="Enter image URL"
                      value={imageUrl || ''}
                      onChange={(e) => setImageUrl(e.target.value || null)}
                    />
                    {imageUrl && (
                      <div className="mt-2 relative rounded-md overflow-hidden h-40">
                        <img
                          src={imageUrl}
                          alt="Cover preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to use for the blog cover image or upload a new image below.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cover">Upload Cover Image</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div 
                      className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={triggerFileInput}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                          <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Click to upload a cover image
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/admin/blogs">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Blog Post"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 