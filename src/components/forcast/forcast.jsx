import './forcast.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();

  const forcastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title"> Daily Forcast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  ></img>
                  <label className="day">{forcastDay[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-deatils-grid-item">
                  <lable>Pressure</lable>
                  <lable>{item.main.pressure} hPa</lable>
                </div>
                <div className="daily-deatils-grid-item">
                  <lable>Humidity</lable>
                  <lable>{item.main.humidity}%</lable>
                </div>
                <div className="daily-deatils-grid-item">
                  <lable>Clouds</lable>
                  <lable>{item.clouds.all}%</lable>
                </div>
                <div className="daily-deatils-grid-item">
                  <lable>Wind Speed</lable>
                  <lable>{item.wind.speed}m/s</lable>
                </div>
                <div className="daily-deatils-grid-item">
                  <lable>See Level</lable>
                  <lable>{item.main.sea_level}m</lable>
                </div>
                <div className="daily-deatils-grid-item">
                  <lable>Feels Like</lable>
                  <lable>{Math.round(item.main.feels_like)}°C</lable>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
