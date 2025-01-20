interface ActionButtonsProps {
	onSave: () => void;
	onReset: () => void;
	onAddRow: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onReset, onAddRow }) => (
	<div className="flex space-x-4 mt-6">
		<button
			onClick={onSave}
			className="w-28 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all ease-in-out"
		>
			Zapisz
		</button>
		<button
			onClick={onReset}
			className="w-28 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-all ease-in-out"
		>
			Odśwież
		</button>
		<button
			onClick={onAddRow}
			className="w-32 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all ease-in-out"
		>
			Dodaj wiersz
		</button>
	</div>
);

export default ActionButtons;
