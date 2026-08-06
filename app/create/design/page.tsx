"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Undo, 
  Redo, 
  Download, 
  Share2, 
  Layers, 
  Image as ImageIcon, 
  Type, 
  Square, 
  Circle,
  Star,
  Sparkles,
  Palette,
  Settings,
  ChevronDown,
  Plus,
  Minus,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Lock,
  Unlock,
  X,
  Trash2,
  MenuIcon,
  Loader2
} from "lucide-react";
import { Stage, Layer, Rect, Text, Image, Circle as KonvaCircle, Star as KonvaStar } from "react-konva";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { HexColorPicker } from "react-colorful";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";

// DesignCanvas component created earlier
import { DesignCanvas } from "@/components/specific-features/DesignCanvas";
import { AIImageGenerator } from "@/components/specific-features/AIImageGenerator";

// Define canvas sizes
const CANVAS_SIZES = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Facebook Post", width: 1200, height: 630 },
  { name: "Twitter Post", width: 1200, height: 675 },
  { name: "LinkedIn Post", width: 1200, height: 627 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Custom", width: 800, height: 600 },
];

// Define element types for TypeScript
interface BaseElement {
  id: number;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  locked: boolean;
  fill: string;
  stroke: string | null;
  strokeWidth: number;
}

interface RectangleElement extends BaseElement {
  type: 'rectangle';
}

interface CircleElement extends BaseElement {
  type: 'circle';
  radius: number;
}

interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  align: string;
}

interface StarElement extends BaseElement {
  type: 'star';
  numPoints: number;
  innerRadius: number;
  outerRadius: number;
}

interface ImageElement extends BaseElement {
  type: 'image';
  image: HTMLImageElement;
}

type DesignElement = RectangleElement | CircleElement | TextElement | StarElement | ImageElement;

export default function DesignEditor() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [canvasSize, setCanvasSize] = useState(CANVAS_SIZES[0]!);
  const [designTitle, setDesignTitle] = useState("Untitled Design");
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  const [activeTab, setActiveTab] = useState("elements");
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [history, setHistory] = useState<DesignElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(100);
  
  // Mock elements for the design
  const [elements, setElements] = useState<DesignElement[]>([]);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Save current state to history
  const saveToHistory = (newElements: DesignElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...(history?.[historyIndex - 1] ?? [])]);
    }
  };
  
  // Handle redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...(history?.[historyIndex + 1] ?? [])]);
    }
  };
  
  // Add a new element to the canvas
  const addElement = (type: string) => {
    let newElement: DesignElement;
    
    switch(type) {
      case "rectangle":
        newElement = {
          id: Date.now(),
          type: "rectangle",
          x: canvasSize.width / 2 - 50,
          y: canvasSize.height / 2 - 50,
          width: 100,
          height: 100,
          fill: "#9929EA",
          stroke: null,
          strokeWidth: 0,
          opacity: 1,
          locked: false,
        } as RectangleElement;
        break;
      case "circle":
        newElement = {
          id: Date.now(),
          type: "circle",
          x: canvasSize.width / 2,
          y: canvasSize.height / 2,
          width: 100,
          height: 100,
          radius: 50,
          fill: "#34D399",
          stroke: null,
          strokeWidth: 0,
          opacity: 1,
          locked: false,
        } as CircleElement;
        break;
      case "text":
        newElement = {
          id: Date.now(),
          type: "text",
          x: canvasSize.width / 2 - 100,
          y: canvasSize.height / 2 - 20,
          width: 200,
          height: 40,
          text: "Double click to edit",
          fontSize: 24,
          fontFamily: "Arial",
          fill: "#111827",
          align: "center",
          stroke: null,
          strokeWidth: 0,
          opacity: 1,
          locked: false,
        } as TextElement;
        break;
      case "star":
        newElement = {
          id: Date.now(),
          type: "star",
          x: canvasSize.width / 2,
          y: canvasSize.height / 2,
          width: 120,
          height: 120,
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 60,
          fill: "#FCD34D",
          stroke: null,
          strokeWidth: 0,
          opacity: 1,
          locked: false,
        } as StarElement;
        break;
      default:
        return;
    }
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(newElement);
    saveToHistory(newElements);
  };
  
  // Update element properties
  const updateElement = (id: number, properties: Partial<DesignElement>) => {
    const updatedElements = elements.map(el => {
      if (el.id === id) {
        return { ...el, ...properties } as DesignElement;
      }
      return el;
    });
    
    setElements(updatedElements);
    
    // Update selected element if it's the one being modified
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...properties } as DesignElement);
    }
    
    saveToHistory(updatedElements);
  };
  
  // Delete selected element
  const deleteElement = () => {
    if (selectedElement) {
      const filteredElements = elements.filter(el => el.id !== selectedElement.id);
      setElements(filteredElements);
      setSelectedElement(null);
      saveToHistory(filteredElements);
    }
  };
  
  // Handle element selection
  const handleSelectElement = (element: DesignElement | null) => {
    if (element?.locked) return;
    setSelectedElement(element);
  };
  
  // Toggle element lock
  const toggleElementLock = () => {
    if (selectedElement) {
      updateElement(selectedElement.id, { locked: !selectedElement.locked });
    }
  };
  
  // Add AI generated image
  const addAIGeneratedImage = (imageUrl: string) => {
    const img = new window.Image();
    img.src = imageUrl;
    
    img.onload = () => {
      // Calculate aspect ratio and size
      let width = 300;
      let height = 300;
      
      if (img.width > img.height) {
        height = (img.height / img.width) * width;
      } else {
        width = (img.width / img.height) * height;
      }
      
      const newElement: ImageElement = {
        id: Date.now(),
        type: "image",
        x: canvasSize.width / 2 - width / 2,
        y: canvasSize.height / 2 - height / 2,
        width,
        height,
        image: img,
        fill: "",
        stroke: null,
        strokeWidth: 0,
        opacity: 1,
        locked: false,
      };
      
      const newElements = [...elements, newElement];
      setElements(newElements);
      setSelectedElement(newElement);
      saveToHistory(newElements);
      setIsGeneratingImage(false);
      setShowAIPanel(false);
    };
  };
  
  // Simulate saving the design
  const saveDesign = () => {
    // In a real application, this would save to a database
    alert("Design saved successfully!");
  };
  
  // Handle zoom change
  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(10, Math.min(200, newZoom)));
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Top toolbar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between p-2 px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.push('/dashboard')}
              className="mr-2"
            >
              <X size={20} />
            </Button>
            <Input
              value={designTitle}
              onChange={(e) => setDesignTitle(e.target.value)}
              className="border-none focus-visible:ring-0 text-lg font-medium w-64"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  {canvasSize.name}
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {CANVAS_SIZES.map((size) => (
                  <DropdownMenuItem 
                    key={size.name}
                    onClick={() => setCanvasSize(size)}
                  >
                    {size.name} ({size.width} × {size.height})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md px-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleZoomChange(zoom - 10)}
              >
                <Minus size={16} />
              </Button>
              <span className="text-sm w-12 text-center">{zoom}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleZoomChange(zoom + 10)}
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo size={20} />
            </Button>
            
            <Button onClick={saveDesign} className="bg-[#8B5DFF] hover:bg-[#7B4DE5]">
              <Save size={18} className="mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-16 border-r border-gray-200 bg-white flex flex-col items-center py-4">
          <Tabs
            orientation="vertical"
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <TabsList className="flex flex-col items-center space-y-4 bg-transparent">
              <TabsTrigger 
                value="elements" 
                className="data-[state=active]:bg-designly-purple-100 data-[state=active]:text-[#8B5DFF] rounded-md p-2"
              >
                <Layout size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="text" 
                className="data-[state=active]:bg-designly-purple-100 data-[state=active]:text-[#8B5DFF] rounded-md p-2"
              >
                <Type size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className="data-[state=active]:bg-designly-purple-100 data-[state=active]:text-[#8B5DFF] rounded-md p-2"
              >
                <ImageIcon size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-designly-purple-100 data-[state=active]:text-[#8B5DFF] rounded-md p-2"
                onClick={() => setShowAIPanel(true)}
              >
                <Sparkles size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="layers" 
                className="data-[state=active]:bg-designly-purple-100 data-[state=active]:text-[#8B5DFF] rounded-md p-2"
              >
                <Layers size={20} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Left panel based on active tab */}
        {!showAIPanel ? (
          <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
            {activeTab === "elements" && (
              <div className="p-4">
                <h3 className="font-medium mb-3">Shapes</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center p-3 h-auto aspect-square"
                    onClick={() => addElement("rectangle")}
                  >
                    <Square size={24} className="mb-1" />
                    <span className="text-xs">Rectangle</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center p-3 h-auto aspect-square"
                    onClick={() => addElement("circle")}
                  >
                    <Circle size={24} className="mb-1" />
                    <span className="text-xs">Circle</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center p-3 h-auto aspect-square"
                    onClick={() => addElement("star")}
                  >
                    <Star size={24} className="mb-1" />
                    <span className="text-xs">Star</span>
                  </Button>
                </div>
                
                <h3 className="font-medium mt-6 mb-3">Elements</h3>
                <div className="grid grid-cols-2 gap-2">
                  {/* Example element cards - would be populated from a library */}
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-2">
                      <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center">
                        <Square size={24} className="text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-2">
                      <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center">
                        <Circle size={24} className="text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === "text" && (
              <div className="p-4">
                <h3 className="font-medium mb-3">Add Text</h3>
                <Button 
                  className="w-full justify-start mb-2 bg-designly-purple-50 text-[#8B5DFF] hover:bg-designly-purple-100 border border-designly-purple-200"
                  onClick={() => addElement("text")}
                >
                  <Type size={18} className="mr-2" />
                  Add Text Box
                </Button>
                
                <h3 className="font-medium mt-6 mb-3">Text Styles</h3>
                <div className="space-y-2">
                  <div 
                    className="p-3 border border-gray-200 rounded-md cursor-pointer hover:border-designly-purple-300 transition-colors"
                    onClick={() => addElement("text")}
                  >
                    <h2 className="text-2xl font-bold">Heading</h2>
                  </div>
                  <div 
                    className="p-3 border border-gray-200 rounded-md cursor-pointer hover:border-designly-purple-300 transition-colors"
                    onClick={() => addElement("text")}
                  >
                    <h3 className="text-xl font-semibold">Subheading</h3>
                  </div>
                  <div 
                    className="p-3 border border-gray-200 rounded-md cursor-pointer hover:border-designly-purple-300 transition-colors"
                    onClick={() => addElement("text")}
                  >
                    <p className="text-base">Body Text</p>
                  </div>
                  <div 
                    className="p-3 border border-gray-200 rounded-md cursor-pointer hover:border-designly-purple-300 transition-colors"
                    onClick={() => addElement("text")}
                  >
                    <p className="text-sm italic">Caption</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "images" && (
              <div className="p-4">
                <h3 className="font-medium mb-3">Upload Image</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-designly-purple-300 transition-colors cursor-pointer">
                  <ImageIcon size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG, GIF</p>
                </div>
                
                <h3 className="font-medium mt-6 mb-3">Stock Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {/* Would be populated from a stock image API */}
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-1">
                        <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-[#8B5DFF] "></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "layers" && (
              <div className="p-4">
                <h3 className="font-medium mb-3">Layers</h3>
                <div className="space-y-1">
                  {elements.map((element) => (
                    <div 
                      key={element.id} 
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                        selectedElement?.id === element.id ? 'bg-designly-purple-100' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleSelectElement(element)}
                    >
                      <div className="flex items-center">
                        {element.type === "rectangle" && <Square size={16} className="mr-2" />}
                        {element.type === "circle" && <Circle size={16} className="mr-2" />}
                        {element.type === "text" && <Type size={16} className="mr-2" />}
                        {element.type === "star" && <Star size={16} className="mr-2" />}
                        {element.type === "image" && <ImageIcon size={16} className="mr-2" />}
                        <span className="text-sm truncate">
                          {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateElement(element.id, { locked: !element.locked });
                        }}
                      >
                        {element.locked ? <Lock size={14} /> : <Unlock size={14} />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">AI Image Generator</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowAIPanel(false)}
                >
                  <X size={16} />
                </Button>
              </div>
              
              {/* Use the AIImageGenerator component */}
              <AIImageGenerator 
                onImageGenerated={addAIGeneratedImage} 
              />
              {/* Track generation state separately */}
              {isGeneratingImage && (
                <div className="mt-4 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Generating image...</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Design canvas */}
        <div className="flex-1 bg-gray-100 overflow-hidden flex items-center justify-center">
          <div 
            className="bg-white shadow-md overflow-hidden" 
            style={{ 
              width: canvasSize.width * (zoom / 100), 
              height: canvasSize.height * (zoom / 100) 
            }}
          >
            <DesignCanvas 
              initialWidth={canvasSize.width}
              initialHeight={canvasSize.height}
              initialElements={elements.map(el => ({
                id: String(el.id),
                type: el.type === 'image' ? 'image' : 
                       el.type === 'text' ? 'text' : 'shape',
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                rotation: 0,
                content: el.type === 'text' ? el.text : undefined,
                src: el.type === 'image' ? el.image.src : undefined,
                fill: el.fill,
                stroke: el.stroke || undefined,
                fontSize: el.type === 'text' ? el.fontSize : undefined,
                fontFamily: el.type === 'text' ? el.fontFamily : undefined,
                shapeType: el.type === 'rectangle' ? 'rect' : 
                           el.type === 'circle' ? 'circle' : undefined
              }))}
              onSave={(savedElements) => console.log('Saved elements:', savedElements)}
            />
          </div>
        </div>
        
        {/* Right sidebar - Properties panel */}
        {selectedElement && (
          <div className="w-72 border-l border-gray-200 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Element Properties</h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={deleteElement}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={toggleElementLock}
                  >
                    {selectedElement.locked ? <Lock size={16} /> : <Unlock size={16} />}
                  </Button>
                </div>
              </div>
              
              {/* Position and size controls */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Position</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">X</label>
                      <Input 
                        type="number" 
                        value={Math.round(selectedElement.x)} 
                        onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                        disabled={selectedElement.locked}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Y</label>
                      <Input 
                        type="number" 
                        value={Math.round(selectedElement.y)} 
                        onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                        disabled={selectedElement.locked}
                      />
                    </div>
                  </div>
                </div>
                
                {(selectedElement.type === "rectangle" || selectedElement.type === "image") && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Size</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Width</label>
                        <Input 
                          type="number" 
                          value={Math.round(selectedElement.width)} 
                          onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
                          disabled={selectedElement.locked}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Height</label>
                        <Input 
                          type="number" 
                          value={Math.round(selectedElement.height)} 
                          onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
                          disabled={selectedElement.locked}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedElement.type === "circle" && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Size</h4>
                    <label className="text-xs text-gray-500 mb-1 block">Radius</label>
                    <Input 
                      type="number" 
                      value={Math.round(selectedElement.radius)} 
                      onChange={(e) => updateElement(selectedElement.id, { radius: Number(e.target.value) })}
                      disabled={selectedElement.locked}
                    />
                  </div>
                )}
                
                {selectedElement.type === "star" && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Star Properties</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Points</label>
                        <Input 
                          type="number" 
                          value={selectedElement.numPoints} 
                          onChange={(e) => updateElement(selectedElement.id, { numPoints: Number(e.target.value) })}
                          min={3}
                          max={12}
                          disabled={selectedElement.locked}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Inner Radius</label>
                        <Input 
                          type="number" 
                          value={Math.round(selectedElement.innerRadius)} 
                          onChange={(e) => updateElement(selectedElement.id, { innerRadius: Number(e.target.value) })}
                          disabled={selectedElement.locked}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Outer Radius</label>
                        <Input 
                          type="number" 
                          value={Math.round(selectedElement.outerRadius)} 
                          onChange={(e) => updateElement(selectedElement.id, { outerRadius: Number(e.target.value) })}
                          disabled={selectedElement.locked}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedElement.type === "text" && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Text</h4>
                    <textarea
                      className="w-full border rounded-md p-2 min-h-[80px]"
                      value={selectedElement.text}
                      onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                      disabled={selectedElement.locked}
                    />
                    
                    <div className="mt-3">
                      <label className="text-xs text-gray-500 mb-1 block">Font Size</label>
                      <Input 
                        type="number" 
                        value={selectedElement.fontSize} 
                        onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                        disabled={selectedElement.locked}
                      />
                    </div>
                    
                    <div className="mt-3">
                      <label className="text-xs text-gray-500 mb-1 block">Alignment</label>
                      <div className="flex border rounded-md overflow-hidden">
                        <button 
                          className={`flex-1 p-2 ${selectedElement.align === 'left' ? 'bg-gray-100' : ''}`}
                          onClick={() => updateElement(selectedElement.id, { align: 'left' })}
                          disabled={selectedElement.locked}
                        >
                          <AlignLeft size={16} className="mx-auto" />
                        </button>
                        <button 
                          className={`flex-1 p-2 ${selectedElement.align === 'center' ? 'bg-gray-100' : ''}`}
                          onClick={() => updateElement(selectedElement.id, { align: 'center' })}
                          disabled={selectedElement.locked}
                        >
                          <AlignCenter size={16} className="mx-auto" />
                        </button>
                        <button 
                          className={`flex-1 p-2 ${selectedElement.align === 'right' ? 'bg-gray-100' : ''}`}
                          onClick={() => updateElement(selectedElement.id, { align: 'right' })}
                          disabled={selectedElement.locked}
                        >
                          <AlignRight size={16} className="mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Color picker for shapes and text */}
                {(selectedElement.type !== "image") && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Fill Color</h4>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button 
                          className="w-full h-10 rounded-md border flex items-center px-3"
                          disabled={selectedElement.locked}
                        >
                          <div 
                            className="w-6 h-6 rounded-full mr-2" 
                            style={{ backgroundColor: selectedElement.fill }}
                          />
                          <span>{selectedElement.fill}</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3">
                        <HexColorPicker 
                          color={selectedElement.fill}
                          onChange={(color) => updateElement(selectedElement.id, { fill: color })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                
                {/* Opacity control */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Opacity: {Math.round(selectedElement.opacity * 100)}%</h4>
                  <Slider
                    value={[selectedElement.opacity * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => updateElement(selectedElement.id, { opacity: (value[0] ?? 100) / 100 })}
                    disabled={selectedElement.locked}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
