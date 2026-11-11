
import { useNavigate } from "react-router-dom";
import {
  IoArrowBackCircle,
  IoStopCircle
} from "react-icons/io5";

interface StopButtonProps {
  onStop: () => void;
}

// TOMBOL KEMBALI
export function BackHomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-4 left-4 z-50 flex items-center gap-2
      bg-blue-600 text-white px-4 py-3 rounded-full
      shadow-lg border-2 border-white
      hover:bg-blue-300 hover:scale-105
      transition hover:text-blue-600 hover:border-blue-600"
    >
      <IoArrowBackCircle className="text-4xl" />
      <span className="font-bold">Kembali</span>
    </button>
  );
}

// TOMBOL STOP
export function StopButton({ onStop }: StopButtonProps) {
  return (
    <button
      onClick={onStop}
      className="fixed top-4 right-4 z-50 flex items-center gap-2
      bg-red-600 text-white px-4 py-3 rounded-full
      shadow-lg border-2 border-white
      hover:bg-red-300 hover:scale-105
      transition hover:text-red-600 hover:border-red-600"
    >
      <IoStopCircle className="text-4xl" />
      <span className="font-bold">Stop</span>
    </button>
  );
}
