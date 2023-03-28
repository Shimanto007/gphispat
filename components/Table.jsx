import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {text, title, title_ms60} from "../styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";

const Table = ({style,text,titletable}) => {

    return (

        <StyledTable className={`table`}>
            <h4>Fatigue performance</h4>
            <p>According to BS 4449:2005+A3:2016 Fatigue test is carried out on full section bars using a sinusoidal tensile load as follows:</p>
            <table>
                <tbody>
                <th>
                    <td>Diamiter, mm</td>
                    <td>BDS ISO 6935-2:2016 (Max)</td>
                    <td>Min, Stress (MPa)</td>
                    <td>No. of Cycles</td>
                </th>
                <tr>
                    <td>>16</td>
                    <td>250</td>
                    <td>50</td>
                    <td>5.0 million</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>231</td>
                    <td>46</td>
                    <td>5.0 million</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>231</td>
                    <td>46</td>
                    <td>5.0 million</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>231</td>
                    <td>46</td>
                    <td>5.0 million</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>231</td>
                    <td>46</td>
                    <td>5.0 million</td>
                </tr>
                </tbody>
            </table>
            <p>All tests are required to survive for 5 million stress cycles under these loading conditions. The procedure is carried out at room temperature with a frequency of up to 200Hz.

               <br/><br/> The test is continued until 5 million stress cycles have been reached or until the fracture of the test sample. </p>

            <ul className="list">
                <li>Rebar Detailing Services -Estimating, Scheduling and Project Management</li>
                <li>Rebar Detailing Services -Estimating, Scheduling and Project Management</li>
                <li>Rebar Detailing Services -Estimating, Scheduling and Project Management</li>
                <li>Rebar Detailing Services -Estimating, Scheduling and Project Management</li>
            </ul>
        </StyledTable>

    )
};


const StyledTable = styled.div`
  h3 {
    font-weight: 600;
    line-height: 30px;
    font-size: 20px;
    color: rgba(34, 34, 34, 0.5);
    text-transform: uppercase;
    margin: 0 0 25px;
  }
`;


export default Table;














