import React from 'react';

export default function ProcessingStatus({ status }) {
  return (
    <div className="p-4 bg-blue-50 rounded">
      <p className="text-blue-800">Processing status: {status || 'In progress...'}</p>
    </div>
  );
}