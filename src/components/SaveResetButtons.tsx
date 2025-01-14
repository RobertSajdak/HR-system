import React from "react";

interface Props {
    onSave: () => void;
    onReset: () => void;
}

const SaveResetButtons: React.FC<Props> = ({ onSave, onReset }) => (
    <div className="flex justify-end gap-4 mt-4">
        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
        </button>
        <button onClick={onReset} className="bg-gray-500 text-white px-4 py-2 rounded">
            Reset
        </button>
    </div>
);

export default SaveResetButtons;
