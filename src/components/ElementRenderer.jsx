import React from 'react';
import { useBuilderStore } from '../store/builderStore';
import { Trash2 } from 'lucide-react';

export const ElementRenderer = ({ element }) => {
  const { setSelectedElement, deleteElement } = useBuilderStore();

  const renderElement = () => {
    switch (element.type) {
      case 'heading':
        return <h1 style={element.styles}>{element.content}</h1>;
      case 'paragraph':
        return <p style={element.styles}>{element.content}</p>;
      case 'image':
        return (
          <img
            src={element.content}
            alt="Content"
            className="max-w-full h-auto"
            style={element.styles}
          />
        );
      case 'button':
        return (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            style={element.styles}
          >
            {element.content}
          </button>
        );
      case 'divider':
        return <hr className="my-4" style={element.styles} />;
      case 'spacer':
        return <div style={{ height: element.styles.height || '2rem' }} />;
      case 'card':
        return (
          <div
            className="bg-white rounded-lg shadow-md p-6"
            style={element.styles}
          >
            {element.content}
          </div>
        );
      case 'list':
        return (
          <ul className="list-disc list-inside" style={element.styles}>
            {element.content.split('\n').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => setSelectedElement(element)}
      className="relative group cursor-pointer"
    >
      {renderElement()}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded pointer-events-none" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteElement(element.id);
        }}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};