import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useBuilderStore } from '../store/builderStore';
import { ElementRenderer } from './ElementRenderer';

export const Canvas = () => {
  const { elements } = useBuilderStore();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 bg-white p-8 min-h-screen overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {elements.map((element) => (
          <ElementRenderer key={element.id} element={element} />
        ))}
        {elements.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500">
              Drag and drop elements here to start building
            </p>
          </div>
        )}
      </div>
    </div>
  );
};