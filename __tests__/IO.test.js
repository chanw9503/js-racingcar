import { Race } from '../src/domain/Race';
import { CarIO } from '../src/view/CarIO';

describe('입출력 관련된 것들', () => {
  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', async () => {
    //Given
    const cario = new CarIO();
    const race = new Race();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw,audi,kia');
    race.racingCars = await cario.inputCars();
    const RACING_COUNT = 5;
    const mockRandomValue = jest.fn().mockReturnValue(5);
    race.racingStart(RACING_COUNT, mockRandomValue);
    cario.showProgressResult(race.racingProgress);

    //then
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('bmw : 1\naudi : 1\nkia : 1')
    );

    logSpy.mockRestore();
  });

  test('자동차 이름은 쉼표(,)로 구분하지 않을 경우, 프로그램을 종료한다.', async () => {
    // Given
    const cario = new CarIO();
    cario.readLineAsync = jest.fn().mockResolvedValue('bmw audi kia');

    // then
    await expect(cario.inputCars()).rejects.toThrow('이름 구분은 쉼표(,)로 가능합니다.');
  });

  test('이름을 5자 초과로 입력했을 경우, 프로그램을 종료한다.', async () => {
    //Given
    const cario = new CarIO();
    const race = new Race();
    // when
    cario.readLineAsync = jest.fn().mockResolvedValue('bmasdasw,audi,kia');

    await expect(cario.inputCars()).rejects.toThrow('이름은 5자 이하만 가능합니다.');
  });
});
