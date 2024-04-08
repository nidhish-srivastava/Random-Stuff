"use client";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type props = {
  onSubmit : (poll : any) => void
}

function PollForm({onSubmit = () => null} : props) {
  const router = useRouter()
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [question, setQuestion] = useState("");
  const [createdBy, setCreatedBy] = useState("autonomous");
  const [disabled,setDisabled] = useState(false)

  const addNewOption = () => {
    if (newOption) {
      if (options.length < 6) {
        setOptions((prev) => [...prev, newOption]);
        setNewOption("");
      } else {
        toast.error("You can add at most six options!");
      }
    } else {
      toast.error("Please enter an option!");
    }
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    let toastId : any;
    try {
      setDisabled(true)
      if (options.length >= 2 && options.length <= 6) {
        if (question.length > 0) {
          toastId = toast.loading("Creating poll...");
          onSubmit({
            title : question,
            options : options,
            createdBy : createdBy
          })
          setTimeout(()=>{
            toast.success("Poll created successfully", {
              id: toastId,
            })
            },1000)
          setTimeout(()=>{
            router.push("/")
          },2000)
        } else {
          toast.error("Please add a question!");
          setDisabled(false)
        }
      } else {
        if (options.length < 2) {
          toast.error("Please add at least two options");
          setDisabled(false)
        } else if (options.length > 6) {
          toast.error("You can add at most six options");
          setDisabled(false)
        }
      }
    } catch (error:Error | any) {
      toast.error(error.message,{
        id : toastId
      })
      setDisabled(false)
    }
  };
  return (
    <div className="flex flex-col gap-3 w-full h-full font-sans">
      <Toaster />
      <div className="form-group flex flex-col gap-3 w-full">
        <label htmlFor="question" className="text-gray-600 dark:text-gray-200">
          Question
        </label>
        <input
          type="text"
          id="question"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="form-control text-gray-700 placeholder:text-gray-600 px-4 py-2 focus:outline-none dark:bg-gray-300 disabled:bg-gray-500 border-gray-400 border-2 rounded"
        />
        <div className="form-group flex flex-col w-full">
          <label htmlFor="option" className="text-gray-600 dark:text-gray-200">
            Add New Option{" "}
            <span className="text-xs text-gray-500 dark:text-gray-300">
              min 2 and max 6
            </span>
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              name="option"
              id="option"
              value={newOption}
              className="form-control px-4 py-2 text-gray-800 placeholder:text-gray-700 focus:outline-none border-gray-400 dark:bg-gray-300 disabled:bg-gray-500 border-2 rounded w-full"
              onChange={(e) => setNewOption(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-green-400 text-gray-800 duration-300 hover:ring-2 rounded ring-green-500"
              onClick={addNewOption}
            >
              <FiPlus />
            </button>
          </div>
        </div>
        {options?.length > 0 && (
          <div className="cursor-context-menu option-container flex flex-col gap-3 w-full overflow-y-scroll max-h-40 h-auto options-container py-1">
            {options?.map((option, i) => (
              <div className="flex gap-3" key={i}>
                <input
                  type="text"
                  className="form-control text-gray-800 placeholder:text-gray-700 px-4 py-2 focus:outline-none dark:bg-gray-300 disabled:bg-gray-500 border-gray-400 border-2 rounded w-full"
                  value={option}
                  onChange={(e) => updateOption(e, i)}
                />
                <button
                  type="button"
                  className="px-4 py-2 duration-300 bg-red-400 text-gray-800 hover:ring-2 rounded ring-red-500"
                  onClick={() => deleteOption(i)}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="form-group flex flex-col w-full">
          <label htmlFor="option1" className="text-gray-600 dark:text-gray-200">
            Created By
          </label>
          <input
            type="text"
            name="createdBy"
            id="createdBy"
            className="form-control px-4 py-2 text-gray-800 placeholder:text-gray-700 dark:bg-gray-300 disabled:bg-gray-500 focus:outline-none border-gray-400 border-2 rounded w-full"
            placeholder="Enter your name"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-400 duration-300 text-black hover:ring-2 rounded ring-green-500"
      >
        Create Poll
      </button>
    </div>
  );
}

export default PollForm;
