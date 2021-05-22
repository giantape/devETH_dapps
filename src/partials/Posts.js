import React, { Component } from 'react';


class Posts extends Component {

    render() {
        // console.log('this.props from state', this.props)
        // console.log('this.props from posts', this.props.account)
        const {images, account} = this.props
        return (
            <div className="col-span-full xl:col-span-12">
                <main>
                    {/** Upload form */}
                    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800">Upload Best Moment!</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const description = this.imageDescription.value
                                        this.props.uploadImage(description)
                                        }} >
                                        <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                                            <div className="form-group mr-sm-2">
                                            <br></br>
                                                <input
                                                id="imageDescription"
                                                type="text"
                                                ref={(input) => { this.imageDescription = input }}
                                                className="w-100"
                                                placeholder="Image description..."
                                                required />
                                            </div>
                                        <button type="submit" className="btn-primary">Upload!</button>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-30 col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                        <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800">Total DTH Earn</h2>
                            </header>
                            <div className="p-3">
                                {/* Table */}
                                <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    {/* Table header */}
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">#Nr</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Hash</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Image Description</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-right">Earn</div>
                                        </th>
                                    </tr>
                                    </thead>
                                    {/* Table body */}
                                    <tbody className="text-sm divide-y divide-gray-100">
                                    {
                                        (images === [] )
                                        ? <React.Fragment>
                                            <h1>You dont have any post yet</h1>
                                        </React.Fragment>
                                        : images.map((image, key) => {
                                            if(account === image.author) {
                                                return(
                                                    <tr key={key}>
                                                        <td className="p-2">
                                                            <div className="text-left">{image.id}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left">{image.hash}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left">{image.description}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-right">{window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} DTH</div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                    </tbody>
                                </table>

                                </div>

                            </div>
                            <footer className="px-5 py-4 border-t border-gray-100">
                                <ul className="footer_block">
                                <li>Total Earning:</li>
                                {
                                    (images === [])
                                    ? <li className="right">0 dTH</li>
                                    : images.map((image, key) => {
                                        if(account === image.author) {
                                            return(
                                                <li className="right" key={key}>{window.web3.utils.fromWei((image.tipAmount * 1).toString(), 'Ether')} DTH</li>
                                            )
                                        }

                                    })
                                }
                                
                                </ul>
                            </footer>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Posts;