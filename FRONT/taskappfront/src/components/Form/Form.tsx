import React, { useState, ChangeEvent, FormEvent } from 'react';
import Label from './Label/Label';
import Input from './Input/Input';
import Select from './Select/Select';
import TextArea from './TextArea/TextArea';
import Button, { EButtonSize, EButtonType } from '../Button/Button'; // Importamos el componente Button

interface FormProps {
  fields: IFieldConfig[];
}

export interface IFieldConfig {
  type: 'label' | 'input' | 'select' | 'textarea' | 'password';
  label?: string;
  options?: string[];
  name: string;
  placeholder?: string
}

const Form: React.FC<FormProps> = ({ fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica del envío del formulario con los datos de formData
    console.log('Datos del formulario:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          {field.type === 'label' && <Label text={field.label} />}
          {(field.type === 'input' || field.type === 'password') && (
            <Input label={field.label} placeholder={field.placeholder} type={field.type === 'password' ? 'password' : 'text'} value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} />
          )}
          {field.type === 'select' && (
            <Select options={field.options || []} value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} />
          )}
          {field.type === 'textarea' && (
            <TextArea value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} />
          )}
        </div>
      ))}
      <Button onClick={handleSubmit} text="Enviar" buttonSize={EButtonSize.LargeButton} buttonType={EButtonType.Main}/> {/* Utilizamos el componente Button */}
    </form>
  );
};

export default Form;