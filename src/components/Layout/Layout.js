import React from 'react'
import clsx from 'clsx';
import useStyles  from '../../assets/styles/globalStyles/styles'

function Layout({children}) {
    const classes=useStyles();
    return (
        <div className={clsx(classes.appBarSpacer)}>
            {children}
        </div>
    )
}

export default Layout
