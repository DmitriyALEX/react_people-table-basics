import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
  checkMotherArray?: Person[];
  checkFatherArray?: Person[];
};

const PersonLink: React.FC<Props> = ({
  person,
  checkMotherArray,
  checkFatherArray,
}) => {
  const location = useLocation();
  const isActive = location.pathname === `/people/${person.slug}`;

  const motherSlug = checkMotherArray?.find(
    mother => mother.name === person.motherName,
  );

  const fatherSlug = checkFatherArray?.find(
    father => father.name === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={cn('', {
        'has-background-warning': isActive,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn('', {
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          <>
            {motherSlug ? (
              <Link
                to={`/people/${motherSlug?.slug}`}
                className={'has-text-danger'}
              >
                {person.motherName}
              </Link>
            ) : (
              <>{person.motherName}</>
            )}
          </>
        ) : (
          '-'
        )}
      </td>

      <td>
        {person.fatherName ? (
          <>
            {fatherSlug ? (
              <Link to={`/people/${fatherSlug?.slug}`}>
                {person.fatherName}
              </Link>
            ) : (
              <>{person.fatherName}</>
            )}
          </>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};

export default PersonLink;
