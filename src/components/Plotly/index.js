'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
import { format } from 'date-fns';

import Loader from '@/components/Loader';
import { PLOTLY_TIME_FORMAT } from '@/constants';

import styles from './plotly.module.css';

export default function Plotly({ data }) {
  const [deformation, setDeformation] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const deltaArray = useMemo(() => data.map(item => item.data.delta ? item.data.delta : 0), [data]);
  const timeArray = useMemo(() => data.map(item => format(item.time, PLOTLY_TIME_FORMAT)), [data]);
  const criticalDeltaArray = useMemo(() => data.map(item => item.criticalDelta), [data]);
  const criticalMinDeltaArray = useMemo(() => data.map(item => -item.criticalDelta), [data]);

  useEffect(() => {
    (async function() {
      try {
        const response = await fetch(
          '/api/measurements/trend/deformation'
        );
        const json = await response.json();
        setDeformation(json);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      { !loaded && <Loader /> }
      {deformation && <Plot
        onInitialized = {() => setLoaded(true)}
        data={[
          {
            x: Object.keys(deformation.points).map(y => format(y, PLOTLY_TIME_FORMAT)),
            y: Object.values(deformation.points),
            mode: "lines+markers",
            type: "scatter",
            name: "Тренд",
            showlegend: true,
            line: {
              color: '#c82f34',
              width: 2,
            },
          },
          {
            x: timeArray,
            y: deltaArray,
            mode: "lines+markers",
            type: "scatter",
            name: "&#9651;",
            showlegend: true,
            line: {
              color: '#1e77b4',
              width: 2,
            },
          },
          {
            x: timeArray,
            y: criticalDeltaArray,
            mode: "lines",
            type: "scatter",
            line: {
              color: '#fd831c',
              width: 2,
              dash: "dash",
            },
            name: "Макс, &#9651; м",
          },
          {
            x: timeArray,
            y: criticalMinDeltaArray,
            mode: "lines",
            type: "scatter",
            line: {
              color: '#5dbe5f',
              width: 2,
              dash: "dash",
            },
            name: "Мин, &#9651; м",
          },
        ]}
        layout={{
          shapes: [
            {
              type: "line",
              yref: "paper",
              x0: format(deformation.endDate, PLOTLY_TIME_FORMAT),
              y0: 0,
              x1: format(deformation.endDate, PLOTLY_TIME_FORMAT),
              y1: 1,
              showlegend: true,
              name: "Конец эксплуатации",
              line: {
                color: "#000000",
                width: 4,
              }
            },
          ],
          width: 600,
          height: 500,
          title: "Смещение по деформационной марке: dm5",
          zeroline: true,
          zerolinecolor: "#000000",
          xaxis: {
            title: "Дата",
          },
          yaxis: {
            title: "Смещение, (&#9651;) м",
          },
      }}
      />
      }
    </div>
  );
}
