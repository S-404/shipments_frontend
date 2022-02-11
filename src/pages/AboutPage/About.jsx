import React from 'react';
import './aboutPage.scss'
import {Link} from "react-router-dom";

const About = () => {
    return (
        <div className='about-page'>
            <h1 className='about-page__header'>
                {(process.env.REACT_APP_NAME).toUpperCase()} v{process.env.REACT_APP_VERSION}
            </h1>
            <div className='about-page__description'>
                <p>Это приложение разработано для повышения эффективности процесса доставки заказов нашим клиентам,
                    затрагивает процесс маршрутизации заказов и их распределения на зоне отгрузки.</p>
            </div>
            <div className='about-page__working-method'>
                <h2 className='working-method__header'>Общий план работы с приложением:</h2>
                <div className='working-method__method-blocks'>
                    <div className='method-blocks__method-block'>
                        <h3 className='method-block__header'>Маршрутизация:</h3>
                        <div className='method-block__description'>
                            <p>Диспетчер на странице <Link to='/dispatcher'>Dispatcher</Link></p>
                            <p> определяет с какого места зоны огрузки будет отгружен тот или иной заказ, планирует
                                время отгрузки, закрепляет номер машины к месту зоны отгрузки.</p>
                        </div>
                    </div>
                    <div className='method-blocks__method-block'>
                        <h3 className='method-block__header'>Передача заказа со склада сотруднику доставки:</h3>
                        <div className='method-block__description'>
                            <p>Сотрудники склада обрабатывают заказ до статуса - <i>'completed'</i>.
                                После заказ передается сотрудникам доставки.</p>
                            <p>Сотрудник доставки на странице <Link to='/picker'>Picker</Link></p>
                            <p> сканирует/вводит номер заказа (тем самым присваивает заказу статус <i>'in place'</i>) и
                                доставляет заказ на указанное место отгрузки, которое было зараннее запланировано
                                Диспетчером.</p>
                        </div>
                    </div>
                    <div className='method-blocks__method-block'>
                        <h3 className='method-block__header'>Загрузка машины:</h3>
                        <div className='method-block__description'>
                            <p>Машина паркуется к воротам в назначенное время,
                                указанным на странице <Link to='/driver'>Driver</Link></p>
                            <p>Отследив статусы заказов, сотрудник доставки может начать загрузку машины,
                                проставляя статусы заказам <i>'is loaded'</i> (на
                                странице <Link to='/dispatcher'>Dispatcher</Link> в окне свойств мест зоны отгрузки</p>
                            <p>По завершении загрузки месту присваивается статус <i>'loading is complete'</i></p>
                        </div>

                    </div>
                    <div className='method-blocks__method-block'>
                        <h3 className='method-block__header'>Очистка данных:</h3>
                        <div className='method-block__description'>
                            <p>Диспетчер может очистить внесенные данные у места
                                со статусом <i>'loading is complete'</i> для планирования следующих отгрузок</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default About;