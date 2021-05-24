import React, { useState } from 'react'
import styled from 'styled-components'
import arrowDown from '@/assets/arrow-down.svg'

type DropdownProps = {
  list: (string | number)[];
  handleItemSelect?: (payload: number) => void;
  closeOnSelect?: boolean;
  buttonText?: string;
}

const SolGitDropdownTwo = styled.div`
position: relative;
cursor: pointer;
.dropdown__button {
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer;
padding: 0.9rem 1.6rem;
background-color: white;
border: 1px solid ${props => props.theme.primary};
border-radius: 8px;
}
.dropdown__list {
background-color: white;
position: absolute;
top: 0;
width: 100%;
z-index: 2;
border: 1px solid ${props => props.theme.primary};
border-radius: 8px;
&.hide {
display: none;
}
.item {
padding: 0.9rem 1.6rem;
&:hover {
background-color: rgba(117, 108, 237, 0.2);
}
}
}
`

const Dropdown = (props: DropdownProps): JSX.Element => {
  const [isOpen, open] = useState(false)
  const [selectedItem, selectItem] = useState(props.list[0])

  const handleItemSelect = (itemIndex: number) => {
    selectItem(props.list[itemIndex])
    open(false)
  }

  const toggleDropdown = () => {
    if (props.list.length) {
      open(!isOpen)
    }
  }

  return (
    <SolGitDropdownTwo className="dropdown">
      <button onClick={toggleDropdown} className="dropdown__button">
        <div>{props.buttonText || selectedItem}</div>
        <img src={arrowDown} />
      </button>
      <div className={`dropdown__list ${isOpen ? '' : 'hide'}`}>
        {props.list.map((item, itemIdx) => {
          return (<div key={itemIdx}
                       onClick={() => {
                         handleItemSelect(itemIdx)
                       }}
                       className="item">
            {item}
          </div>)
        })}
      </div>
    </SolGitDropdownTwo>
  )
}

export default Dropdown
