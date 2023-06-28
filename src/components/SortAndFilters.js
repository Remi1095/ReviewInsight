import React from 'react';
import ToggleMenu from './ToggleMenu'

function SortAndFilters() {

    return (
        <div className="filters-box">
            <h2 className="ps-2 pt-2 mb-0">Sort</h2>
            <hr />


            <h2 className="ps-2 pt-2 mb-0">Include</h2>
            <hr />
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Genres"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Classification"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Author"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Title"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Language"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Number of words"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Reviews"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            <div className="mx-3 mt-2">
                <ToggleMenu
                    menuName="Date published"
                    content={
                        <ul>
                            <li>Menu 2 Item 1</li>
                            <li>Menu 2 Item 2</li>
                            <li>Menu 2 Item 3</li>
                        </ul>
                    }
                />
            </div>
            

            <h2 className="ps-2 pt-2 mb-0">Exclude</h2>
            <hr />



        </div>
    )

}

export default SortAndFilters;