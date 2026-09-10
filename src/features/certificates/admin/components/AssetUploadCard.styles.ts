import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.1rem;
`;

export const SectionDescription = styled.p`
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const UploadRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const TextInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(55, 251, 137, 0.6);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const FileInput = styled.input`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  
  &::file-selector-button {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    cursor: pointer;
    margin-right: 12px;
    transition: background 0.2s ease;
  }

  &::file-selector-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  color: #001e2b;
  background: linear-gradient(140deg, #37fb89, #00d672);
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  margin: 12px 0 0;
  color: #ff7070;
  font-size: 0.85rem;
`;

export const UploadMeta = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(55, 251, 137, 0.3);
  border-radius: 8px;

  p {
    margin: 0 0 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;

    strong {
      color: #ffffff;
    }
  }

  p:last-of-type {
    margin-bottom: 12px;
  }
`;

export const LinkUrl = styled.a`
  color: #37fb89;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
