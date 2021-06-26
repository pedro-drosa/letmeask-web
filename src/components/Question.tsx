import { ReactNode } from 'react';

import '../styles/question.scss';

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,
  },
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question(props: QuestionProps) {
  return (
    <div 
      className={ `question ${props.isAnswered? 'answered':''} ${props.isHighlighted ? 'highlighted' : ''}`}
    >
      <p>{props.content}</p>
      <footer>
        <div className="user-info">
          <img src={props.author.avatar} alt={props.author.name} />
          <span>{props.author.name}</span>
        </div>
        <div>
          {props.children}
        </div>
      </footer>
    </div>
  );
}