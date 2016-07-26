import React, {PropTypes} from 'react';

let html = `<!DOCTYPE html>
<html>
    <head>
        <title>S3 Site</title>
    </head>
    <body>
        <h1>It worked!</h1>
    </body>
</html>`;

let dlBlob = "data:application/octet-stream," + encodeURIComponent(html);

export default class Content extends React.Component {
    render() {
        return (<div>
            <div>Bitches and hoes </div>
            <h1>Serving static websites from Amazon S3</h1>
            <p>There are plenty of these guides out there but here's the quick and dirty version of how to get your content serving statically from S3.
            No server maintenance, no worries about scaling, just upload and let 'err rip.</p>
            <hr/>
            <h2>Create static resources</h2>
            <p>We'll need to start with some static resources for the site. Feel free to use your own, but I'm
            providing a simple example here.</p>
            <p>Copy the below content or right click > save as, to a local file: <a href={dlBlob} download={"index.html"}>{"index.html"}</a></p>
            <pre><code>
                {html}
            </code></pre>
            <hr/>
            <h2>Create your bucket</h2>
            <p>Sign in to the AWS console and navigate to S3.</p>
            <p>Here you'll need to create a bucket to host your content. Select 'Create Bucket' and enter a bucket name and region.</p>
            <p>If you are going to be using a custom domain name e.g.: 'driveways.lol' then name your bucket that.
            Otherwise anything will work but your content will be available at: <i><b>{"bucket_name"}</b>{".s3-website-"}<b>region_name</b>.amazonaws.com</i></p>
            <h3>Enable website hosting</h3>
            <p>Now select your bucket, and click the 'Properties' button to modify its settings.Under 'Static Website
                Hosting' select 'Enable website hosting' and make sure the 'Index Document' is referencing index.html
                from earlier.</p>
            <h3>Upload static content</h3>
            <ul>
                <li>
                    Open the bucket by selecting its name from the left-hand panel
                </li>
                <li>
                    Choose 'Actions' > 'Upload' and upload index.html
                </li>
                <li>
                    select the newly uploaded index.html and go to 'Actions' > 'Make public'
                </li>
            </ul>
            <p>That's it!</p>
            <p>You can now re-open the bucket's properties pane and open the 'Static Website Hosting' > 'Endpoint' link
                to see your content being served.</p>
            <hr/>
            <h2>Optional, setup domain redirection with Route53</h2>
            <p>If you have a domain registered through Route53 it's very simple to setup redirection to an S3 bucket.
            </p>
            <ul>
                <li>
                    Open the Route53 page in the AWS console and navigate to 'Hosted zones'.
                </li>
                <ul>
                    <li>
                        Setup a route to your bucket
                            <ul>
                                <li>
                                    Select <b>Create Record Set</b>
                                    <ul>
                                        <li>
                                            Type: <b>A - IPv4 Address</b>
                                        </li>
                                        <li>
                                            Alias: <b>Yes</b>
                                        </li>
                                        <li>With Alias set to yes select your bucket under <i>-- S3 website endpoints --</i> in the
                                            dropdown menu.</li>
                                        <li>Click 'Create'</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    <li>
                        Redirect www.<b>your_domain</b> to the index page.
                        <ul>
                            <li>
                                Select <b>Create Record Set</b>
                                <ul>
                                    <li>
                                        Type: <b>CNAME - Canonical name</b>
                                    </li>
                                    <li>
                                        Alias: <b>No</b>
                                    </li>
                                    <li>With Alias set to no enter the name of the A record you just created, e.g.: 'driveways.lol'</li>
                                    <li>Click 'Create'</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </ul>
            <p>
                Your DNS records should populate in about a minute, then try navigating to `https://yourdomain' and you'll see the site!
            </p>
            <hr/>

        </div>);
    }
}