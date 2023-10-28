import React, { useEffect } from 'react';
import MyTable from '../components/TableCrm.jsx';
import ExportButtons from '../components/ExportButtonsCrm';
import { useCrm } from '../context/CrmContext';

function CrmPage() {
    const { getCrms, crms } = useCrm();
    console.log(crms)
    useEffect(() => {
        getCrms();
    }, []);

    return (
        <div><br />
            <ExportButtons data={crms} /> <br /> <br />
            <MyTable data={crms} />
            
        </div>
    );
}

export default CrmPage;