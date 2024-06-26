import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Trip from "./Empty";
import { Container, List } from "./styles/triplist.styled";
import Empty from "./Empty";

function Triplist() {
  const triplist = useSelector((state) => state.triplist).state;
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();

  let trips = triplist;

  if (trips && trips.length > 0) {
    trips = [...trips]
      .sort((a, b) => a.data.start_date - b.data.start_date)
      .filter((trip) => trip.data.end_date >= today)
      .concat(trips.filter((trip) => trip.data.end_date < today));
  }

  const initTrips = trips;
  const [filteredTrips, setFilteredTrips] = useState(initTrips);
  const [tabIdx, setTabIdx] = useState(0);

  const filterTrips = (type) => {
    let results = initTrips
      .filter((trip) => trip.data.end_date >= today)
      .concat(initTrips.filter((trip) => trip.data.end_date < today));

    if (type === "all") {
      setTabIdx(0);
    }
    if (type === "incoming") {
      setTabIdx(1);
      results = initTrips.filter((trip) => trip.data.start_date > today);
    }
    if (type === "past") {
      setTabIdx(2);
      results = initTrips.filter((trip) => trip.data.end_date < today);
    }

    setFilteredTrips(results);
  };

  const menuArr = [
    {
      label: "전체",
      onClick: () => {
        filterTrips("all");
      },
    },
    {
      label: "다가올 여행",
      onClick: () => {
        filterTrips("incoming");
      },
    },
    {
      label: "다녀온 여행",
      onClick: () => {
        filterTrips("past");
      },
    },
  ];

  return (
    <Container>
      {filteredTrips && filteredTrips.length > 0 ? (
        <List>
          {filteredTrips.map((trip) => (
            <Trip
              key={trip.id}
              id={trip.id}
              image={trip.data.image}
              title={trip.data.title}
              start_date={trip.data.start_date}
              end_date={trip.data.end_date}
            />
          ))}
        </List>
      ) : (
        <List>
          <Empty />
        </List>
      )}
    </Container>
  );
}

export default Triplist;
