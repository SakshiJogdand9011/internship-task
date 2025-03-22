import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertyPanel } from './components/PropertyPanel';
import { useBuilderStore } from './store/builderStore';

function App() {
  const { addElement } = useBuilderStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'canvas') {
      const type = active.data.current?.type;
      if (type) {
        addElement({
          id: crypto.randomUUID(),
          type,
          content: type === 'heading' ? 'New Heading' :
                  type === 'paragraph' ? 'New paragraph text' :
                  type === 'image' ? 'https://source.unsplash.com/random/800x400' :
                  type === 'button' ? 'Click me' :
                  type === 'card' ? 'Card Content' :
                  type === 'list' ? 'Item 1\nItem 2\nItem 3' :
                  '',
          styles: type === 'spacer' ? { height: '2rem' } : {},
        });
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <Canvas />
        <PropertyPanel />
      </div>
    </DndContext>
  );
}

export default App;