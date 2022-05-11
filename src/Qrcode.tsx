import { useQRCode } from 'next-qrcode';

function Qrcode(props: { url: string }) {

  const { url } = props;
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={url}
      options={{
        type: 'image/png',
        margin: 0,
        width: 128
      }}
    />
  );
}

export default Qrcode;
