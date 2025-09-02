'use client';

import { templateRegistry } from '../templates';
import Footer from '@/components/Footer';

export default function TestTemplatesPage() {
  console.log('Template registry in test page:', templateRegistry);
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Template Test Page</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Template Registry Length: {templateRegistry.length}</h2>
        </div>
        {templateRegistry.map((template, index) => (
          <div key={template.id} className="p-4 border rounded">
            <h3 className="font-semibold">{template.name}</h3>
            <p>ID: {template.id}</p>
            <p>Category: {template.category}</p>
            <p>Component: {template.component}</p>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
