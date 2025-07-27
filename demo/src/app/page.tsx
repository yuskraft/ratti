'use client';

import { useState } from 'react';
import { RateStar, type StarRatingVariant } from 'ratti';

interface DemoProps {
  variant: StarRatingVariant;
  value: number;
  maxRating: number;
  precision: number;
  size: number;
  activeColorsEnabled: boolean;
  readOnly: boolean;
}

export default function Home() {
  const [props, setProps] = useState<DemoProps>({
    variant: 'default',
    value: 4.2,
    maxRating: 4,
    precision: 0.1,
    size: 64,
    activeColorsEnabled: false,
    readOnly: false,
  });

  const updateProp = <K extends keyof DemoProps>(key: K, value: DemoProps[K]) => {
    setProps(prev => ({ ...prev, [key]: value }));
  };

  const InlineInput = ({ 
    value, 
    onChange, 
    type = 'number',
    min,
    max,
    step,
    options
  }: { 
    value: any; 
    onChange: (value: any) => void; 
    type?: 'number' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: { value: any; label: string }[];
  }) => {
    if (type === 'select') {
      return (
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="min-w-fit px-2 py-1 text-sm font-medium rounded-md bg-purple-100 text-purple-800 border-none outline-none shadow-none"
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-16 px-2 py-1 text-sm font-medium rounded-md bg-blue-100 text-blue-800 border-none outline-none shadow-none text-center"
      />
    );
  };

  const PropLine = ({ 
    propName, 
    value, 
    onChange, 
    type = 'number',
    min,
    max,
    step,
    options
  }: { 
    propName: string;
    value: any; 
    onChange: (value: any) => void; 
    type?: 'number' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: { value: any; label: string }[];
  }) => (
    <div className="flex items-center gap-2">
      <span className="text-blue-400">{propName}</span>
      <span className="text-gray-400">=</span>
      <span className="text-yellow-400">&#123;</span>
      <InlineInput
        value={value}
        onChange={onChange}
        type={type}
        min={min}
        max={max}
        step={step}
        options={options}
      />
      <span className="text-yellow-400">&#125;</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Ratti - Star Rating Component
          </h1>
          <p className="text-xl text-gray-300">
            Interactive demo for developers - Edit the props directly in the code!
          </p>
        </div>

        {/* Interactive Code Snippet */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Interactive Code Snippet</h2>
          <div className="bg-black rounded-lg p-6 font-mono text-xl text-gray-100 overflow-x-auto border border-gray-700">
            <div className="space-y-3">
              <div className="text-blue-400">&lt;RateStar</div>
              <div className="mx-6 space-y-2">
                <PropLine
                  propName="variant"
                  value={props.variant}
                  onChange={(value) => updateProp('variant', value)}
                  type="select"
                  options={[
                    { value: 'default', label: 'default' },
                    { value: 'circle', label: 'circle' },
                    { value: 'square', label: 'square' }
                  ]}
                />
                <PropLine
                  propName="value"
                  value={props.value}
                  onChange={(value) => updateProp('value', value)}
                  min={0}
                  max={props.maxRating}
                  step={props.precision}
                />
                <PropLine
                  propName="maxRating"
                  value={props.maxRating}
                  onChange={(value) => updateProp('maxRating', value)}
                  min={1}
                  max={10}
                />
                <PropLine
                  propName="precision"
                  value={props.precision}
                  onChange={(value) => updateProp('precision', value)}
                  min={0.1}
                  max={1}
                  step={0.1}
                />
                <PropLine
                  propName="size"
                  value={props.size}
                  onChange={(value) => updateProp('size', value)}
                  min={16}
                  max={128}
                />
                <PropLine
                  propName="activeColorsEnabled"
                  value={props.activeColorsEnabled}
                  onChange={(value) => updateProp('activeColorsEnabled', value)}
                  type="select"
                  options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                  ]}
                />
                <PropLine
                  propName="readOnly"
                  value={props.readOnly}
                  onChange={(value) => updateProp('readOnly', value)}
                  type="select"
                  options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                  ]}
                />
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">onChange</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">setValue</span>
                </div>
              </div>
              <div className="text-blue-400">/&gt;</div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="text-center">
          <div className="bg-gray-900 rounded-lg p-12 mb-6">
            <RateStar
              variant={props.variant}
              value={props.value}
              maxRating={props.maxRating}
              precision={props.precision}
              size={props.size}
              activeColorsEnabled={props.activeColorsEnabled}
              readOnly={props.readOnly}
              onChange={(value) => updateProp('value', value)}
            />
          </div>
          <div className="text-xl text-gray-300">
            Current value: <span className="text-white font-semibold">{props.value}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
