"use client";

import React from "react";
import { Shield, Cpu, Users, Star, Eye, Check, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const values: Value[] = [
  {
    title: "Safety First",
    description: "We believe that safety should never be compromised. Every product we design prioritises protection above all else.",
    icon: <Shield className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Innovation",
    description: "We continuously push the boundaries of what's possible in hand protection through research and innovation.",
    icon: <Cpu className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Customer Focus",
    description: "We listen to our clients' needs and develop solutions that address their specific safety challenges.",
    icon: <Users className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Quality Excellence",
    description: "Our rigorous quality control ensures that every product meets the highest standards of durability and performance.",
    icon: <Star className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Design Clarity",
    description: "We believe in clear, purposeful design that enhances function while providing intuitive user experience.",
    icon: <Eye className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Compliance",
    description: "Our products meet or exceed all relevant safety standards and certifications across global markets.",
    icon: <Check className="h-8 w-8 text-brand-primary" />,
  },
];

export const MissionValues = () => {
  return (
    <section id="mission-values" className="py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        {/* Mission Statement */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-3">
              Why We Exist
            </h2>
          </div>
          
          <Card className="bg-[#F5EFE0]/80 dark:bg-transparent border-brand-primary/10 dark:border-brand-primary/20 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5">
                  <Target className="h-10 w-10 text-brand-primary" />
                </div>
              </div>
              <p className="text-lg text-brand-secondary dark:text-gray-300 italic mb-3">
                "To protect the hands that build our world through innovative safety solutions that combine
                uncompromising protection, exceptional comfort, and Italian design excellence."
              </p>
              <p className="text-sm text-brand-secondary dark:text-gray-300 max-w-3xl mx-auto">
                At HandLine, we're committed to developing products that not only meet but exceed safety standards,
                whilst maintaining the dexterity and comfort essential for workers across all industries.
                Our designs balance functionality with aesthetics, creating safety equipment that 
                people want to wear.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Values */}
        <div>
          <div className="text-center mb-8">
            <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-3">
              Principles That Guide Us
            </h2>
            <p className="text-base text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do at HandLine, from product design to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none"
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="mb-3 p-2 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-brand-secondary dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 