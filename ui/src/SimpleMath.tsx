import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './SimpleMath.css';

type Board = string[];

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
    <div ref={drop} className={`droppable-cell ${isOver ? 'hover' : ''} ${operators.includes(value ?? '') ? ' operator' : ''}`}>
      {value}
    </div>
  );
};

function SimpleMath() {
  const [board, setBoard] = useState<Board>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userNotification, setUserNotification] = useState<string>("");

  const useBackendBoard = async () => {
    const response = await fetch('http://localhost:8080/math/board');
    if (response.ok) {
      setBoard(await response.json());
    } else {
      setBoard(Array(40).fill('?'));
    }
  }

  const validateBoard = async () => {
    const response = await fetch(
      `http://localhost:8080/math/board/validate`,
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(board),
        headers: {
          "Content-Type": "application/json"
        }
      });
    if (response.ok) {
      const res = await response.json() as { valid: boolean };
      if (res.valid) {
        setUserNotification("Brawo, to prawidłowa odpowiedź!")
        setIsCorrect(true);
      } else {
        setUserNotification("Niestety, gdzieś czai się błąd ...")
        setIsCorrect(false);
      }
    } else {
      console.error(response);
      setUserNotification(response.statusText);
      setIsCorrect(false);
    }
  };

  const handleDrop = (index: number) => (item: { value: string }) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = item.value;
      return newBoard;
    });
  };

  return (<>
      <div className="navbar">
        <span className="emphasized correct">Prawidowo: 0</span> <span>| </span>
        <span className="emphasized incorrect">Nieprawidłowo: 1</span> <span>| </span>
        <a href={"/"} className="link">Powrót</a>
      </div>

      <h1>🧮 Simple Math</h1>
      <button onClick={useBackendBoard} className={isCorrect ? 'explode' : ''}>
        Wygeneruj nowe równania
      </button>
      <p className={isCorrect ? 'explode read-the-docs' : 'read-the-docs'}>
        <h2>{userNotification}</h2>
      </p>
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

        </div>


        <button onClick={validateBoard} className="validate-button">
          Sprawdź rozwiązanie
        </button>
      </DndProvider>
    </>
  );
}

export default SimpleMath;
