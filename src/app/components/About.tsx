import { Card, CardContent } from "./ui/card";
import { Shield, Award, Clock, ThumbsUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed professional drivers",
  },
  {
    icon: Award,
    title: "10+ Years Experience",
    description: "Expert knowledge of Hamburg",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Available 24/7 for your convenience",
  },
  {
    icon: ThumbsUp,
    title: "5-Star Rated",
    description: "Highly rated by our customers",
  },
];

export function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1649186019834-18ee06d7d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcml2ZXIlMjBzbWlsaW5nfGVufDF8fHx8MTc2NzgyMTgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional driver"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="text-5xl font-bold mb-2">2500+</div>
              <div className="text-lg">Happy Customers</div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We're not just drivers—we're your local guides, storytellers, and 
              companions on your Hamburg journey. With passion and professionalism, 
              we turn every ride into an unforgettable experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
