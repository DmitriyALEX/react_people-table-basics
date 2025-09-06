import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import PersonLink from '../components/PersonLink';
import { getPeople } from '../api';
import { Person } from '../types/Person';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
        setIsLoading(false);
      } catch (e) {
        setError('Something went wrong');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const checkMotherArray = people?.filter(person => {
    return people?.some(p => person.name === p.motherName);
  });
  const checkFatherArray = people?.filter(person => {
    return people?.some(p => person.name === p.fatherName);
  });

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && people !== null && people?.length === 0 && (
            <>
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            </>
          )}

          {!isLoading && !error && people && people?.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <PersonLink
                    person={person}
                    key={person.slug}
                    checkMotherArray={checkMotherArray}
                    checkFatherArray={checkFatherArray}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
