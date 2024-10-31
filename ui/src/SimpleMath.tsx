import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './SimpleMath.css';

const ItemType = {
  NUMBER: 'number',
  OPERATOR: 'operator',
};

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '='];

const DraggableItem = ({ value }: { value: string }) => {
  const [, drag] = useDrag(() => ({
    type: value.match(/[0-9]/) ? ItemType.NUMBER : ItemType.OPERATOR,
    item: { value },
  }));

  return (
    <div ref={drag} className="draggable-item">
      {value}
    </div>
  );
};

const DroppableCell = ({ onDrop, value }: { onDrop: (item: any) => void; value: string | null }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [ItemType.NUMBER, ItemType.OPERATOR],
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`droppable-cell ${isOver ? 'hover' : ''}`}>
      {value}
    </div>
  );
};

function SimpleMath() {
  const [board, setBoard] = useState<(string | null)[]>(Array(25).fill(null));

  const validateBoard = () => {
    const rows = Array.from({ length: 5 }, (_, i) => board.slice(i * 5, i * 5 + 5));
    const isValidEquation = (row: (string | null)[]) => {
      const expression = row.filter((cell) => cell).join('');
      try {
        return eval(expression) >= 0 && eval(expression) <= 100;
      } catch {
        return false;
      }
    };

    if (rows.every(isValidEquation)) {
      alert('All equations are correct!');
    } else {
      alert('Some equations are incorrect or out of range.');
    }
  };

  const handleDrop = (index: number) => (item: { value: string }) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = item.value;
      return newBoard;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="simple-math">
        <div className="immutable-column">
          {[...numbers, ...operators].map((value) => (
            <DraggableItem key={value} value={value}/>
          ))}
        </div>

        <div className="board">
          {board.map((cellValue, index) => (
            <DroppableCell key={index} value={cellValue} onDrop={handleDrop(index)}/>
          ))}
        </div>

        <button onClick={validateBoard} className="validate-button">
          Validate
        </button>

      </div>
    </DndProvider>
  );
}

export default SimpleMath;
