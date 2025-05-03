import { Metadata } from "next";
import { IndustriesHero } from "@/components/website/industries/hero";
import { IndustryCard } from "@/components/website/industries/industry-card";
import { CaseStudy as CaseStudyComponent, CaseStudy } from "@/components/website/industries/case-study";
import { Separator } from "@/components/ui/separator";
import { getAllIndustries } from "@/lib/industries-service";

export const metadata: Metadata = {
  title: "Industry Solutions | HandLine Company",
  description: "Explore HandLine's tailored safety solutions for a wide range of industries, including manufacturing, construction, chemical processing, and more.",
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Sample case study data - this could be moved to Supabase later
const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Reducing Hand Injuries in Automotive Manufacturing",
    slug: "automotive-manufacturing-case-study",
    industry: "Manufacturing",
    challenge: "A leading automotive manufacturer was experiencing a high rate of hand injuries, particularly cuts and burns, during assembly operations. These injuries led to significant lost time and decreased productivity.",
    solution: "HandLine provided a customized solution with our HL C4PU-5 cut-resistant gloves for assembly line workers and HL P84 heat-resistant gloves for welding stations. We also implemented a comprehensive training program on proper glove usage.",
    results: [
      "73% reduction in hand injuries within the first 6 months",
      "Decreased downtime by 42% due to fewer work stoppages",
      "Improved worker comfort and compliance with safety protocols",
      "ROI achieved within 8 months through reduced workers' compensation claims"
    ],
    testimonial: {
      quote: "HandLine's solution transformed our safety culture. Their products provided the protection we needed without sacrificing dexterity, and their training program ensured proper implementation across all shifts.",
      author: "James Richardson",
      position: "Safety Director",
      company: "NTL Automotive"
    },
    image_url: "/images/case-studies/automotive.jpg"
  },
  {
    id: "2",
    title: "Chemical Laboratory Hazard Mitigation",
    slug: "chemical-laboratory-case-study",
    industry: "Chemical Processing",
    challenge: "A pharmaceutical research laboratory needed protection against a wide range of chemicals while maintaining precise control for delicate operations. Standard nitrile gloves were providing inadequate protection against more aggressive solvents.",
    solution: "HandLine implemented a dual-glove system using our specialized chemical-resistant HL 103 inner gloves with FFP2 Cup-Shaped Respirators for comprehensive respiratory protection. We also provided customized storage solutions to prevent contamination.",
    results: [
      "Zero chemical exposure incidents reported since implementation",
      "Improved dexterity reported by 92% of laboratory technicians",
      "Extended working periods without glove changes due to superior durability",
      "Reduction in waste through longer-lasting PPE"
    ],
    testimonial: {
      quote: "The HandLine solution addressed our unique requirements perfectly. We needed protection without compromising precision, and their products delivered exactly that. The comprehensive approach to our safety needs was impressive.",
      author: "Dr. Sarah Chen",
      position: "Laboratory Manager",
      company: "Innovex Pharmaceuticals"
    },
    image_url: "/images/case-studies/laboratory.jpg"
  }
];

export default async function IndustriesPage() {
  // Get all industries from Supabase
  const { data: industries = [] } = await getAllIndustries();
  
  console.log(`Fetched ${industries.length || 0} industries for display`);
  
  return (
    <main className="bg-brand-light dark:bg-background">
      <IndustriesHero />
      
      {/* Industries Section */}
      <section id="industry-sectors" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-4">
              Sectors We Serve
            </h2>
            <p className="max-w-2xl mx-auto text-brand-secondary dark:text-gray-300">
              At HandLine, we develop specialized safety solutions for a diverse range of industries, 
              each with unique challenges and requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {industries.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>
      
      <Separator className="border-t border-brand-primary/10 dark:border-brand-primary/20" />
      
      {/* Case Studies Section */}
      <section id="case-studies" className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark dark:text-white mb-2 sm:mb-4">
              Success Stories
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-secondary dark:text-gray-300">
              Discover how our solutions have helped companies across various sectors improve 
              safety, increase productivity, and reduce costs.
            </p>
          </div>
          
          <div className="space-y-2 sm:space-y-4">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyComponent 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                isEven={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 