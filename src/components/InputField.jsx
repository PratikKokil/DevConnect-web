import React from 'react'

 const InputField = ({ label, type, value, onChange, placeholder }) => (
      <>
        <span>{label}</span>
        {type === "textarea" ?(
         <textarea
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input"
          rows={5}
          column={5}
          />
        ):(
          <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input"
        />
        )}

      </>
);

export default InputField
