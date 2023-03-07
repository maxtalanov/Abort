import React, {useState} from 'react';
import {Card, Avatar, Button, notification} from "antd";
import {
    CheckCircleOutlined,
    EditOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
    SettingOutlined,
    StopOutlined
} from '@ant-design/icons';
import avatar from "./assets/avatar.jpg";
import {BASE_HEADERS, BASE_PATH, BASE_URL, checkResponse} from "./utilis/constantion";

import './Abort.css';

const {Meta} = Card;
const iconError = <ExclamationCircleOutlined style={{color: '#e91010'}}/>
const iconStop = <StopOutlined style={{color: '#e9be10'}}/>
const iconSuccess = <CheckCircleOutlined style={{color: '#00ff49'}}/>

function Abort() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [logsErrors, setLogsErorrs] = useState([]);
    const [controller, setController] = useState(new AbortController());
    const [api, contextHolder] = notification.useNotification();

    const fetchData = async () => {
        const URL = `${BASE_URL}/${BASE_PATH.photos}`;

        return fetch(URL, {
            method: "GET",
            headers: BASE_HEADERS,
            signal: controller.signal
        })
            .then(checkResponse)
            .then(response => {
                setData(response);
                openNotification({
                    placement: 'topLeft',
                    massage: 'Даннные успешно загружены',
                    description: 'Даннные успешно загружены',
                    icon: iconSuccess,
                })
            })
            .catch((error) =>{
                setLogsErorrs([...logsErrors, error]);

                if (error.name === 'AbortError' || error.code === 20 || error === 'DOMException: The user aborted a request.') {
                    openNotification({
                        placement: 'topLeft',
                        massage: 'Запрос отменен',
                        description: ' Запрос отменен',
                        icon: iconStop,
                    })
                } else {
                    openNotification({
                        placement: 'topLeft',
                        massage: 'Произошла ошибка',
                        description: `Код ошибки ${error.status} ${error.statusText}`,
                        icon: iconError,
                    });
                }

            })
            .finally(()=> {
                setIsLoading(false);
            })
    }

    const handlerSubmitClick = (event) => {
        event.preventDefault();

        setIsLoading(true);
        fetchData();
    }

    const handlerCanalClick = () => {
        controller.abort();
        setController(new AbortController());
        setIsLoading(false);
    }

    const openNotification = ({placement, massage, description, icon}) => {
        return api.open({
            key: Date.now(),
            massage,
            description,
            placement,
            icon,
        });
    };

    return (
        <div className="Abort">
            {contextHolder}
            <Card
                title="Заголовок"
                bordered={true}
                loading={false}
                actions={[
                    <SettingOutlined key="setting"/>,
                    <EditOutlined key="edit"/>,
                    <EllipsisOutlined key="ellipsis"/>,
                ]}

            >
                <Meta
                    avatar={<Avatar size={64} src={avatar}/>}
                    title="Card title"
                    description="This is the description"
                />
            </Card>

            <Button
                type="primary"
                loading={isLoading}
                onClick={handlerSubmitClick}
            >
                Загрузить доп информацию
            </Button>
            {
                isLoading
                    ? <Button type="primary" danger onClick={handlerCanalClick}>Отменить операцию</Button>
                    : null
            }
        </div>

    );
}

export default Abort;
