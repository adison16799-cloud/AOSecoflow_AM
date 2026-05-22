import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from './Button';

export const SignaturePad = ({ onSign, onCancel, label = "Sign here" }) => {
  const signatureRef = useRef(null);
  const [isSigned, setIsSigned] = useState(false);

  const handleClear = () => {
    signatureRef.current?.clear();
    setIsSigned(false);
  };

  const handleSave = () => {
    if (signatureRef.current?.isEmpty()) {
      alert('Please sign first');
      return;
    }

    const signatureData = signatureRef.current.toDataURL();
    setIsSigned(true);
    onSign(signatureData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{label}</label>
        <div className="border-2 border-dashed border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4 bg-aeco-light-bg dark:bg-aeco-dark-bg/50">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              width: 500,
              height: 200,
              className: 'w-full border border-aeco-light-border dark:border-aeco-dark-border rounded bg-white'
            }}
            backgroundColor="white"
            penColor="#06b6d4"
            velocityFilterWeight={0.7}
            minWidth={1.5}
            maxWidth={2.5}
          />
        </div>
        <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 mt-2">
          Draw your signature above
        </p>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={handleClear}>
          🗑️ Clear
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          ✅ Sign
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
