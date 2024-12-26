import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Website URL Update',
};

const ChangeWebsiteUrl = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                {/* <li>
                    <Link href="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li> */}
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Website URL Update</span>
                </li>
            </ul>

            <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
                {/* type=url */}
                <PanelCodeHighlight
                    title="Update Website URL"
                    codeHighlight={`<form>
    <input type="url" placeholder="https://dummyurl.com" className="form-input" required />
    <button type="submit" className="btn btn-primary mt-6">
        Submit
    </button>
</form>`}
                >
                <div className="mb-5">
                    {/* <label className="m-2">Update Website URL </label> */}
                    <form>
                        <input type="url" placeholder="https://dummyurl.com" className="form-input" required />
                        <button type="submit" className="btn btn-primary mt-6">
                            Submit
                        </button>
                    </form>
                </div>
                </PanelCodeHighlight>
            </div>
        </div>
    );
};

export default ChangeWebsiteUrl;
