import React from 'react'
import styled from 'styled-components'

const SolGitModal = styled.div`
min-width: 100vw;
max-width: 100vw;
min-height: 100vh;
max-height: 100vh;
background-color: rgba(0, 0, 0, .4);
display: flex;
align-items: center;
justify-content: center;
position: fixed;
z-index: ${props => props.theme.zIndexModal};
.modal {
&__content {
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
max-width: 100vw;
min-width: 50vw;
border-radius: 1.6rem;
}
}
`

type ModalProps = {
  open: (isOpen: boolean) => void;
  isOpen: boolean;
  children: React.ReactChild;
  className?: string;
}

const Modal = (props: ModalProps): JSX.Element | null => {

  const close = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target !== event.currentTarget) return;
    props.open(false)
  }

  return props.isOpen? (
    <SolGitModal className={`modal ${props.className}`} onClick={(e) => close(e)}>
      <div className="modal__content">
      {props.children}
      </div>
    </SolGitModal>
  ) : null
}

export default Modal
