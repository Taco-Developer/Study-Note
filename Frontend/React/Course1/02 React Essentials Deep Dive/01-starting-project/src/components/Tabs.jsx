export default function Tabs({ ButtonsContainer = 'menu', buttons, children }) {
  //   const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
