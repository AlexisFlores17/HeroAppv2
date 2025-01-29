import { useState } from "react";

interface Props {
  initialForm:{[key: string]: string};
}


export const useForm = ({initialForm}:Props) => {

  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    
  };
};