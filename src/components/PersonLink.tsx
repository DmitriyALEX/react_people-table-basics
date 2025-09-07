import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <>-</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn('', {
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
