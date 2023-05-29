import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextColor} from '../colors/colors';

const useCountdown = targetDate => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {}, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (countDownDate - new Date().getTime() <= 0) {
        clearInterval(interval);
        setCountDown(15);
        return getReturnValues(15);
      }
      setCountDown(countDownDate - new Date().getTime());
      // console.log(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown, event) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  let data = days + hours + minutes + seconds;

  if (data <= 0) {
    return [0, 0, 0, 0];
  } else {
    return [days, hours, minutes, seconds];
  }
};

// export {useCountdown};

export const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
  showType,
  shawDays,
  showHours,
  showMinutes,
  showSeconds,
}) => {
  return (
    <View style={styles.renderTimerContainer}>
      {shawDays && (
        <DateTimeDisplay
          value={days}
          type={'Days'}
          isDanger={days <= 3}
          showType={showType}
        />
      )}
      {shawDays && <Text>:</Text>}
      {showHours && (
        <DateTimeDisplay
          value={hours}
          type={'Hours'}
          isDanger={false}
          showType={showType}
        />
      )}
      {showHours && <Text>:</Text>}
      {showMinutes && (
        <DateTimeDisplay
          value={minutes}
          type={'Mins'}
          isDanger={false}
          showType={showType}
        />
      )}
      {showMinutes && <Text>:</Text>}
      {showSeconds && (
        <DateTimeDisplay
          value={seconds}
          type={'Seconds'}
          isDanger={false}
          showType={showType}
        />
      )}
    </View>
  );
};

const DateTimeDisplay = ({value, type, isDanger, showType}) => {
  return (
    <View>
      <Text style={styles.returnValue}>{value}</Text>
      {showType && <Text style={styles.returnValue}>{type}</Text>}
    </View>
  );
};

export const CountdownTimer = ({
  targetDate,
  showType,
  shawDays,
  showHours,
  showMinutes,
  showSeconds,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  // if (days + hours + minutes + seconds <= 0) {

  // }
  // else {
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      showType={showType}
      shawDays={shawDays}
      showHours={showHours}
      showMinutes={showMinutes}
      showSeconds={showSeconds}
    />
  );
  // }
};

// const ExpiredNotice = () => {
//   return (
//     <View className="expired-notice">
//       <Text>Expired!!!</Text>
//       <Text>Please select a future date and time.</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  renderTimerContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    // marginTop: 20
  },
  returnValue: {
    // fontSize: 20,
    fontWeight: 'Montserrat-Medium',
    textAlign: 'center',
    color: TextColor,
  },
});
