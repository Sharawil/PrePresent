'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AIResponse {
  script: string;
  keywords: string[];
  explanations: Record<string, string>;
  viva: { question: string; answer: string }[];
}

export default function HomePage() {
  const [projectInfo, setProjectInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!projectInfo.trim()) {
      setError('Please enter your project information.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectInfo }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate presentation');
      }

      const aiResult: AIResponse = await response.json();
      setResult(aiResult);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate presentation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">PrePresent - AI Presentation Assistant</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Project Details</CardTitle>
          <CardDescription>
            Describe your project, technology stack, and key features. Be specific for better results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={projectInfo}
            onChange={(e) => setProjectInfo(e.target.value)}
            placeholder="Example: 'A machine learning web app that predicts house prices using React, TensorFlow.js, and a Random Forest algorithm. Users input property features and get price predictions with visualization.'"
            className="min-h-[100px]"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full"
          >
            {loading ? 'Generating...' : 'Generate Presentation'}
          </Button>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <div className="mt-6 space-y-6">
          {/* Presentation Script */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Presentation Script</CardTitle>
              <CardDescription>Your structured presentation script</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.script}</p>
            </CardContent>
          </Card>

          {/* Technical Keywords & Explanations */}
          <Card>
            <CardHeader>
              <CardTitle>🎓 Key Concepts & Prerequisites</CardTitle>
              <CardDescription>Important technical terms with simple explanations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(result.explanations || {}).map(([term, explanation]) => (
                <div key={term} className="p-3 border rounded-lg">
                  <Badge variant="secondary" className="mb-2">{term}</Badge>
                  <p className="text-sm">{explanation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Viva Questions */}
          <Card>
            <CardHeader>
              <CardTitle>❓ Expected Viva Questions</CardTitle>
              <CardDescription>Common questions you might be asked</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.viva?.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-900">Q: {item.question}</p>
                  <p className="text-sm mt-1 text-blue-800">A: {item.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )}