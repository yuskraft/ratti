'use client';

import { useState } from 'react';
import { RateStar, type StarRatingVariant } from 'ratti';
import { ArrowDownIcon, ArrowUpIcon, ArrowRightIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';


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
    value: 4.5,
    maxRating: 5,
    precision: 0.5,
    size: 64,
    activeColorsEnabled: false,
    readOnly: false,
  });

  const updateProp = <K extends keyof DemoProps>(key: K, value: DemoProps[K]) => {
      setProps(prev => ({ ...prev, [key]: value }));
  };

  const InlineInput = ({
    value: externalValue,
    onChange,
    type = 'number',
    min,
    max,
    step,
    options
  }: {
    value: any;
    onChange: (value: any) => void;
    type?: 'number' | 'select' | 'boolean';
    min?: number;
    max?: number;
    step?: number;
    options?: { value: any; label: string }[];
  }) => {
    const handleIncrement = () => {
      if (type === 'number' && max !== undefined && externalValue < max) {
        const newValue = Math.min(max, externalValue + (step || 1));
        onChange(newValue);
      }
    };

    const handleDecrement = () => {
      if (type === 'number' && min !== undefined && externalValue > min) {
        const newValue = Math.max(min, externalValue - (step || 1));
        onChange(newValue);
      }
    };

    const handleBooleanToggle = () => {
      if (type === 'boolean') {
        onChange(!externalValue);
      }
    };
  
    if (type === 'select') {
      return (
        <Select.Root value={externalValue.toString()} onValueChange={(value) => onChange(value)}>
          <Select.Trigger className="min-w-fit px-2 py-1 text-xs sm:text-sm bg-gray-800 font-medium rounded-md border-none outline-none shadow-none text-white hover:bg-gray-700 flex items-center gap-1">
            <Select.Value placeholder="Select a value" />
            <Select.Icon>
              <ChevronDownIcon className="w-4 h-4" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollUpButton">
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                {options?.map((option) => (
                  <Select.Item key={option.value.toString()} value={option.value.toString()} className="SelectItem">
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="SelectItemIndicator">✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollDownButton">
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      );
    }

    if (type === 'boolean') {
      return (
        <button
          type="button"
          onClick={handleBooleanToggle}
          className="px-2 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 hover:bg-gray-700"
        >
          {externalValue ? 'true' : 'false'}
        </button>
      );
    }
  
    return (
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={min !== undefined && externalValue <= min}
          className="w-6 sm:h-[28px] h-[24px] text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md flex items-center justify-center transition-colors"
        >
          <ArrowDownIcon/>
        </button>
        <div className="w-12 sm:w-12 py-1 text-xs sm:text-sm font-medium rounded-none text-white bg-gray-800 border-none outline-none shadow-none text-center">
          {externalValue}
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={max !== undefined && externalValue >= max}
          className="w-6 sm:h-[28px] h-[24px] text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md flex items-center justify-center transition-colors"
        >
          <ArrowUpIcon  />
        </button>
      </div>
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
    type?: 'number' | 'select' | 'boolean';
    min?: number;
    max?: number;
    step?: number;
    options?: { value: any; label: string }[];
  }) => (
    <div className="flex items-center gap-1 sm:gap-2 ml-4 flex-wrap">
      <span className="text-gray-500 text-xs sm:text-sm">{propName}</span>
      <span className="text-gray-400 text-xs sm:text-sm">=</span>
      <span className="text-gray-500 text-xs sm:text-sm">&#123;</span>
      <InlineInput
        value={value}
        onChange={onChange}
        type={type}
        min={min}
        max={max}
        step={step}
        options={options}
      />
      <span className="text-gray-500 text-xs sm:text-sm">&#125;</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center mt-[5%]">
          <div className="w-full lg:w-auto">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Ratti <span className="text-gray-400 text-sm">v0.1.4</span></h2>
              <p className="text-gray-300 mb-6 sm:mb-[25px] max-w-md text-sm sm:text-base">
                A lightweight, customizable star rating component for React with TypeScript support. 
                Features multiple variants, precision control, and smooth animations for modern web applications.
              </p>
            <div className='flex gap-2 flex-wrap'>
              <button type="button" className="px-3 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                Get Started
                <ArrowRightIcon className="w-4 h-4" />
              </button>
              <a   href="https://github.com/yuskraft/ratti" target="_blank" rel="noopener noreferrer" className='font-mono mono-light px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-800 hover:bg-gray-700 transition-colors text-sm'>
                star on github
              </a>
            </div>
                          <div className="rounded-md mt-8 sm:mt-[50px] font-mono text-sm sm:text-lg text-gray-100 overflow-x-auto relative">
                <div className="absolute top-0 left-[-20px] sm:left-[-45px] h-full w-[100px] sm:w-[150px] bg-gradient-to-r from-black to-transparent z-20"></div>
              <div className="space-y-3 min-w-0">
                <div className="flex min-w-0">
                  <span className="text-gray-500 mr-4 select-none flex-shrink-0">1</span>
                  <div className="min-w-0 overflow-x-auto">
                    <span className="text-gray-500">import</span> <span className="text-gray-500">&#123; RateStar &#125;</span> <span className="text-gray-500">from</span> <span className="text-gray-500">'ratti'</span><span className="text-gray-500">;</span>
                  </div>
                </div>
                <div className="flex min-w-0">
                  <span className="text-gray-500 mr-4 select-none flex-shrink-0">2</span>
                  <span className="text-gray-400"></span>
                </div>
                <div className="flex min-w-0">
                  <span className="text-gray-500 mr-4 select-none flex-shrink-0">3</span>
                  <span className="text-gray-500">&lt;RateStar</span>
                </div>
                <div className="space-y-2">
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-4 select-none flex-shrink-0">4</span>
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
                  </div>
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-4 select-none flex-shrink-0">5</span>
                    <PropLine
                      propName="value"
                      value={props.value}
                      onChange={(value) => updateProp('value', value)}
                      min={0}
                      max={props.maxRating}
                      step={props.precision}
                    />
                  </div>
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-4 select-none flex-shrink-0">6</span>
                    <PropLine
                      propName="maxRating"
                      value={props.maxRating}
                      onChange={(value) => updateProp('maxRating', value)}
                      min={1}
                      max={10}
                    />
                  </div>
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-4 select-none flex-shrink-0">7</span>
                    <PropLine
                      propName="precision"
                      value={props.precision}
                      onChange={(value) => updateProp('precision', value)}
                      min={0.1}
                      max={1}
                      step={0.1}
                    />
                  </div>
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-4 select-none flex-shrink-0">8</span>
                    <PropLine
                      propName="size"
                      value={props.size}
                      onChange={(value) => updateProp('size', value)}
                      min={16}
                      max={128}
                    />
                  </div>
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-4 select-none flex-shrink-0">9</span>
                    <PropLine
                      propName="activeColorsEnabled"
                      value={props.activeColorsEnabled}
                      onChange={(value) => updateProp('activeColorsEnabled', value)}
                      type="boolean"
                    />
                  </div>
                  <div className="flex min-w-0">
                    <span className="text-gray-500 mr-1 select-none flex-shrink-0">10</span>
                    <PropLine
                      propName="readOnly"
                      value={props.readOnly}
                      onChange={(value) => updateProp('readOnly', value)}
                      type="boolean"
                    />
                  </div>
                </div>
                <div className="flex min-w-0">
                  <span className="text-gray-500 mr-4 select-none flex-shrink-0">11</span>
                  <span className="text-gray-500">/&gt;</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 w-full lg:w-auto">
            <div className="rounded-md flex items-center justify-center w-[400px]">
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
            <div className="text-center">
              <div className="text-lg sm:text-xl text-gray-300">
                <span className="text-white font-semibold">{props.value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
