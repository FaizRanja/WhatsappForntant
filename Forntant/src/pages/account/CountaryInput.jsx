import React, { useEffect, useRef } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const CountaryInput = () => {
  const phoneInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const phoneInput = intlTelInput(phoneInputRef.current, {
      separateDialCode: true,
      preferredCountries: ["in"],
      hiddenInput: "full",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
    });

    formRef.current.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullNumber = phoneInput.getNumber(intlTelInputUtils.numberFormat.E164);
      alert(fullNumber);
      // Set the hidden input value
      document.querySelector("input[name='phone_number[full]']").value = fullNumber;
    });
  }, []);

  return (
    <form ref={formRef}>
      <input type="tel" name="phone_number[main]" id="phone_number" ref={phoneInputRef} />
      <input type="hidden" name="phone_number[full]" />
      <button type="submit" name="save">Save</button>
    </form>
  );
};

export default CountaryInput;

