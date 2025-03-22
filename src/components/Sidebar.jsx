import React from 'react';
import { Heading1, Type, Image, Square, Minus, ArrowDown, CreditCard, List } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

const elements = [
  { type: 'heading', icon: Heading1, label: 'Heading' },
  { type: 'paragraph', icon: Type, label: 'Paragraph' },
  { type: 'image', icon: Image, label: 'Image' },
  { type: 'button', icon: Square, label: 'Button' },
  { type: 'divider', icon: Minus, label: 'Divider' },
  { type: 'spacer', icon: ArrowDown, label: 'Spacer' },
  { type: 'card', icon: CreditCard, label: 'Card' },
  { type: 'list', icon: List, label: 'List' },
];

export const DraggableElement = ({ type, icon: Icon, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${type}-draggable`,
    data: { type },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm cursor-move hover:bg-gray-50 transition-colors"
    >
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Elements</h2>
      <div className="space-y-3">
        {elements.map((element) => (
          <DraggableElement key={element.type} {...element} />
        ))}
      </div>
    </div>
  );
};