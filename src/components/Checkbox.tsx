import React from 'react'
import styled from 'styled-components'

type CheckboxProps = {
  labelText?: string;
  isChecked: boolean;
  toggleCheckbox: () => void;
}

const SolGitCheckbox = styled.label`
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 0.75rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  input {
  width: 0;
  height: 0;
  opacity: 0;
    &:checked ~ .checkmark {
      border-color: ${props => props.theme.primary};
      background-color: ${props => props.theme.primary};
    }
    &:checked ~ .checkmark:after {
      border-color: white;
    }
  }

  .label {
    font-size: 1.8rem;
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    text-align: left;
    white-space: nowrap;
  }

  .checkmark {
    height: 1.6rem;
    width: 1.6rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
    background-color: ${props => props.theme.background};
    border-radius: 2px;

    &:after {
      transition: display ease .2s;
      display: block;
      border: 1px solid white; // ${props => props.theme.background};
      content: "";
      position: absolute;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      left: 0.5rem;
      top: 0.1rem;
      width: 0.5rem;
      height: 0.9rem;
      border-width: 0 2px 2px 0;
    }
  }
`

const Checkbox = (props: CheckboxProps): JSX.Element => {
  return (<SolGitCheckbox className="checkbox__container">
    <input
      type="checkbox"
    />
    <div className="checkmark"></div>
  </SolGitCheckbox>)
}

export default Checkbox
