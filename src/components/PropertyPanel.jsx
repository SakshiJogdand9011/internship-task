import React from 'react';
import { useBuilderStore } from '../store/builderStore';

export const PropertyPanel = () => {
  const { selectedElement, updateElement } = useBuilderStore();

  if (!selectedElement) {
    return (
      <div className="w-64 bg-gray-50 p-4 border-l border-gray-200">
        <p className="text-gray-500 text-sm">Select an element to edit its properties</p>
      </div>
    );
  }

  const handleContentChange = (e) => {
    updateElement(selectedElement.id, { content: e.target.value });
  };

  const handleStyleChange = (property, value) => {
    updateElement(selectedElement.id, {
      styles: { ...selectedElement.styles, [property]: value },
    });
  };

  const renderContentField = () => {
    if (selectedElement.type === 'list') {
      return (
        <textarea
          value={selectedElement.content}
          onChange={handleContentChange}
          placeholder="Enter items (one per line)"
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      );
    }
    
    if (selectedElement.type === 'spacer' || selectedElement.type === 'divider') {
      return null;
    }

    return (
      <input
        type={selectedElement.type === 'image' ? 'url' : 'text'}
        value={selectedElement.content}
        onChange={handleContentChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder={selectedElement.type === 'image' ? 'Enter image URL' : 'Enter content'}
      />
    );
  };

  return (
    <div className="w-64 bg-gray-50 p-4 border-l border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Properties</h2>
      
      <div className="space-y-4">
        {selectedElement.type !== 'spacer' && selectedElement.type !== 'divider' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            {renderContentField()}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={parseInt(selectedElement.styles.width) || ''}
              onChange={(e) => handleStyleChange('width', `${e.target.value}px`)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <select
              value={selectedElement.styles.width?.includes('%') ? '%' : 'px'}
              onChange={(e) => {
                const currentWidth = parseInt(selectedElement.styles.width) || 100;
                handleStyleChange('width', `${currentWidth}${e.target.value}`);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="px">px</option>
              <option value="%">%</option>
            </select>
          </div>
        </div>

        {selectedElement.type !== 'divider' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={parseInt(selectedElement.styles.height) || ''}
                onChange={(e) => handleStyleChange('height', `${e.target.value}px`)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={selectedElement.styles.height?.includes('%') ? '%' : 'px'}
                onChange={(e) => {
                  const currentHeight = parseInt(selectedElement.styles.height) || 100;
                  handleStyleChange('height', `${currentHeight}${e.target.value}`);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="px">px</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>
        )}

        {['heading', 'paragraph', 'button', 'list'].includes(selectedElement.type) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <input
                type="number"
                value={parseInt(selectedElement.styles.fontSize) || 16}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Weight
              </label>
              <select
                value={selectedElement.styles.fontWeight || '400'}
                onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="color"
            value={selectedElement.styles.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-full"
          />
        </div>

        {selectedElement.type !== 'divider' && selectedElement.type !== 'spacer' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={selectedElement.styles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Top"
              value={parseInt(selectedElement.styles.paddingTop) || ''}
              onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Right"
              value={parseInt(selectedElement.styles.paddingRight) || ''}
              onChange={(e) => handleStyleChange('paddingRight', `${e.target.value}px`)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Bottom"
              value={parseInt(selectedElement.styles.paddingBottom) || ''}
              onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Left"
              value={parseInt(selectedElement.styles.paddingLeft) || ''}
              onChange={(e) => handleStyleChange('paddingLeft', `${e.target.value}px`)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {selectedElement.type !== 'divider' && selectedElement.type !== 'spacer' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border Radius
            </label>
            <input
              type="number"
              value={parseInt(selectedElement.styles.borderRadius) || ''}
              onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};