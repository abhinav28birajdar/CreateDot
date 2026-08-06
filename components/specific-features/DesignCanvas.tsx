"use client";

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to handle SSR issues with Konva
const Stage = dynamic(() => import('react-konva').then(mod => mod.Stage), { ssr: false });
const Layer = dynamic(() => import('react-konva').then(mod => mod.Layer), { ssr: false });
const KonvaImage = dynamic(() => import('react-konva').then(mod => mod.Image), { ssr: false });
const KonvaText = dynamic(() => import('react-konva').then(mod => mod.Text), { ssr: false });
const Rect = dynamic(() => import('react-konva').then(mod => mod.Rect), { ssr: false });
import { 
  Move, 
  ZoomIn, 
  ZoomOut, 
  Type, 
  ImageIcon, 
  Square, 
  Palette, 
  Grid, 
  Save, 
  Undo, 
  Redo,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesignCanvasProps {
  initialWidth?: number;
  initialHeight?: number;
  initialElements?: CanvasElement[];
  onSave?: (elements: CanvasElement[]) => void;
}

export interface CanvasElement {
  id: string;
  type: 'image' | 'text' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  content?: string;
  src?: string;
  fill?: string;
  stroke?: string;
  fontSize?: number;
  fontFamily?: string;
  shapeType?: 'rect' | 'circle' | 'line';
}

export function DesignCanvas({ 
  initialWidth = 800, 
  initialHeight = 600, 
  initialElements = [],
  onSave
}: DesignCanvasProps) {
  const [isClient, setIsClient] = useState(false);
  const [elements, setElements] = useState<CanvasElement[]>(initialElements);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'text' | 'image' | 'shape'>('select');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<CanvasElement[][]>([initialElements]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const stageRef = useRef<any>(null);
  const imageRefs = useRef<{ [key: string]: HTMLImageElement }>({});

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateStageSize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight - 120
      });
    };

    updateStageSize();
    window.addEventListener('resize', updateStageSize);
    
    return () => window.removeEventListener('resize', updateStageSize);
  }, []);

  // Initialize image refs for Konva
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    elements.forEach(element => {
      if (element.type === 'image' && element.src && !imageRefs.current[element.id]) {
        const img = new window.Image();
        img.src = element.src;
        imageRefs.current[element.id] = img;
      }
    });
  }, [elements]);

  // Add elements to history when they change
  useEffect(() => {
    setHistory((prevHistory) => {
      if (
        historyIndex < prevHistory.length - 1 || 
        JSON.stringify(elements) !== JSON.stringify(prevHistory[historyIndex])
      ) {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push([...elements]);
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      }
      return prevHistory;
    });
  }, [elements, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prev = history[historyIndex - 1];
      if (prev) setElements([...prev]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const next = history[historyIndex + 1];
      if (next) setElements([...next]);
    }
  };

  const handleZoomIn = () => {
    setScale(scale * 1.2);
  };

  const handleZoomOut = () => {
    setScale(Math.max(0.1, scale / 1.2));
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleStageWheel = (e: any) => {
    e.evt.preventDefault();
    
    const scaleBy = 1.1;
    const oldScale = scale;
    
    const pointer = stageRef.current?.getPointerPosition();
    if (!pointer) return;
    
    const mousePointTo = {
      x: (pointer.x - position.x) / oldScale,
      y: (pointer.y - position.y) / oldScale,
    };
    
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
    setScale(newScale);
    
    setPosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  const handleElementSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleStageDragMove = (e: any) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleElementDragMove = (e: any, id: string) => {
    const updatedElements = elements.map(element => {
      if (element.id === id) {
        return {
          ...element,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const handleAddText = () => {
    const newId = `text-${Date.now()}`;
    const newElement: CanvasElement = {
      id: newId,
      type: 'text',
      x: initialWidth / 2 - 100,
      y: initialHeight / 2,
      width: 200,
      height: 50,
      content: 'Double click to edit',
      fontSize: 24,
      fontFamily: 'Inter',
      fill: '#333333',
    };
    setElements([...elements, newElement]);
    setSelectedId(newId);
  };

  const handleAddImage = () => {
    if (typeof window === 'undefined') return;
    
    // This would typically open a file picker or image gallery
    // For demo purposes, we'll use a placeholder
    const newId = `image-${Date.now()}`;
    const placeholderImage = 'https://source.unsplash.com/random/300x200/?design';
    
    const img = new window.Image();
    img.src = placeholderImage;
    imageRefs.current[newId] = img;
    
    const newElement: CanvasElement = {
      id: newId,
      type: 'image',
      x: initialWidth / 2 - 150,
      y: initialHeight / 2 - 100,
      width: 300,
      height: 200,
      src: placeholderImage,
    };
    
    setElements([...elements, newElement]);
    setSelectedId(newId);
  };

  const handleAddShape = () => {
    const newId = `shape-${Date.now()}`;
    const newElement: CanvasElement = {
      id: newId,
      type: 'shape',
      shapeType: 'rect',
      x: initialWidth / 2 - 50,
      y: initialHeight / 2 - 50,
      width: 100,
      height: 100,
      fill: '#9929EA',
      stroke: '#7c1d96',
    };
    setElements([...elements, newElement]);
    setSelectedId(newId);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(elements);
    }
    
    // For demo, we can also export as image
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'design.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setTool('select')}
            className={tool === 'select' ? 'bg-designly-purple-100 border-designly-purple-500' : ''}
          >
            <Move className="h-4 w-4 mr-1" />
            Select
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setTool('text');
              handleAddText();
            }}
          >
            <Type className="h-4 w-4 mr-1" />
            Text
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setTool('image');
              handleAddImage();
            }}
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Image
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setTool('shape');
              handleAddShape();
            }}
          >
            <Square className="h-4 w-4 mr-1" />
            Shape
          </Button>
          <div className="h-4 border-l border-gray-300 mx-2" />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <div className="h-4 border-l border-gray-300 mx-2" />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 overflow-hidden relative">
        {!isClient ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-designly-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading design canvas...</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable={tool === 'select' && !selectedId}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragMove={handleStageDragMove}
            onWheel={handleStageWheel}
            onClick={(e) => {
              // Deselect when clicking on stage background
              if (e.target === e.currentTarget) {
                setSelectedId(null);
              }
            }}
          >
            <Layer>
              {/* Canvas background */}
              <Rect
                x={0}
                y={0}
                width={initialWidth}
                height={initialHeight}
                fill="#ffffff"
                stroke="#dddddd"
                strokeWidth={1}
              />
              
              {/* Render all elements */}
              {elements.map((element) => {
                const isSelected = selectedId === element.id;
                
                if (element.type === 'image' && element.src) {
                  return (
                    <KonvaImage
                      key={element.id}
                      id={element.id}
                      x={element.x}
                      y={element.y}
                      width={element.width}
                      height={element.height}
                      image={imageRefs.current[element.id]}
                      draggable={isSelected}
                      onClick={() => handleElementSelect(element.id)}
                      onDragMove={(e) => handleElementDragMove(e, element.id)}
                      stroke={isSelected ? '#9929EA' : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                  );
                }
                
                if (element.type === 'text') {
                  return (
                    <KonvaText
                      key={element.id}
                      id={element.id}
                      x={element.x}
                      y={element.y}
                      width={element.width}
                      height={element.height}
                      text={element.content}
                      fontSize={element.fontSize}
                      fontFamily={element.fontFamily}
                      fill={element.fill}
                      draggable={isSelected}
                      onClick={() => handleElementSelect(element.id)}
                      onDragMove={(e) => handleElementDragMove(e, element.id)}
                      stroke={isSelected ? '#9929EA' : undefined}
                      strokeWidth={isSelected ? 1 : 0}
                    />
                  );
                }
                
                if (element.type === 'shape' && element.shapeType === 'rect') {
                  return (
                    <Rect
                      key={element.id}
                      id={element.id}
                      x={element.x}
                      y={element.y}
                      width={element.width}
                      height={element.height}
                      fill={element.fill}
                      stroke={isSelected ? '#9929EA' : element.stroke}
                      strokeWidth={isSelected ? 2 : 1}
                      draggable={isSelected}
                      onClick={() => handleElementSelect(element.id)}
                      onDragMove={(e) => handleElementDragMove(e, element.id)}
                    />
                  );
                }
                
                return null;
              })}
            </Layer>
          </Stage>
        </div>
        )}
      </div>
    </div>
  );
}
