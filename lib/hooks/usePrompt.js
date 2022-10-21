import { useEffect, useCallback, useRef } from 'react';
import useZustandStore from '../../store/zustandStore';

function usePrompt() {
  const isPromptOpen = useZustandStore((state) => state.isPromptOpen);
  const setPromptOpen = useZustandStore((state) => state.setPromptOpen);
  const question = useZustandStore((state) => state.question);
  const setQuestion = useZustandStore((state) => state.setQuestion);
  const answer = useZustandStore((state) => state.answer);
  const setAnswer = useZustandStore((state) => state.setAnswer);

  const promptRef = useRef();

  const closePrompt = useCallback(() => {
    setPromptOpen(false);
    document.querySelector('body').classList.remove('modal-open');
  }, [setPromptOpen]);

  useEffect(() => {
    if (isPromptOpen) document.querySelector('body').classList.add('modal-open');
  }, [isPromptOpen]);

  useEffect(() => {
    if (answer) closePrompt();
  }, [answer, closePrompt]);

  const handleClickOutside = (e) => {
    if (!promptRef.current.contains(e.target)) {
      closePrompt();
    }
  };

  const reset = () => {
    setAnswer(false);
    setQuestion('');
  };

  return { promptRef, isPromptOpen, setPromptOpen, closePrompt, question, setAnswer, setQuestion, answer, handleClickOutside, reset };
}
export default usePrompt;
