
import React from 'react';
import Layout from '@/components/layouts/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-medium mb-6">Our Story</h1>
          
          <div className="prose prose-lg">
            <p className="mb-4">
              Welcome to Evergreen, where sustainability meets style. Our journey began with a simple idea: to create beautifully crafted clothing and accessories that are as kind to the planet as they are to the people who make them.
            </p>
            
            <div className="my-8">
              <img 
                src="https://images.unsplash.com/photo-1581375074612-d3fd5ef7c391?q=80&w=1080&auto=format&fit=crop" 
                alt="Sustainable workshop" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
            <p className="mb-4">
              At Evergreen, we believe that fashion shouldn't come at the cost of our environment. That's why we're committed to using sustainable materials, ethical manufacturing processes, and environmentally friendly packaging for all our products.
            </p>
            
            <h2 className="text-2xl font-medium mb-4">Our Values</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Sustainability in every step of our process</li>
              <li className="mb-2">Ethical treatment and fair wages for all workers</li>
              <li className="mb-2">Timeless designs that transcend seasonal trends</li>
              <li className="mb-2">Transparency in our supply chain and business practices</li>
              <li className="mb-2">Community engagement and giving back initiatives</li>
            </ul>
            
            <div className="my-8">
              <img 
                src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1080&auto=format&fit=crop" 
                alt="Sustainable materials" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            <h2 className="text-2xl font-medium mb-4">Our Promise</h2>
            <p>
              We promise to continue innovating and improving our practices to minimize our environmental impact while maximizing our positive social impact. When you shop with Evergreen, you're not just buying clothing—you're joining a movement toward a more sustainable and ethical fashion industry.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
