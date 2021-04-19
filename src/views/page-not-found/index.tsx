import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export const PageNotFound = () => {
    const history = useHistory();
    const backToHome = () => {
        history.push('/home');
    }
    return(
        <div>
            page not found
            <div>
                <Button onClick={backToHome}>back to home</Button>
            </div>
        </div>
    );
}