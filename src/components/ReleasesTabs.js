import React from 'react';
import {
    Tabs, Tab, TabTitleText,
    Text, TextVariants, TextContent,
    List, ListItem, ListVariant,
    Button,
} from '@patternfly/react-core'
import {Link} from 'gatsby'

function PrereleaseText(props) {
    return (
        <TextContent>
            <Text component={TextVariants.p}>
Kodi v19 "Matrix" has entered the release cycle. This cycle consists of Alpha, Beta and RC releases followed by the stable Recommended release. If you are interested, you can <Link to="http://en.wikipedia.org/wiki/Software_release_life_cycle">read more about the software release cycle</Link>.
            </Text>
            <Text component={TextVariants.p}>
<b>THESE BUILDS CAN BE UNSTABLE</b> for daily usage and should only be used to help us find possible bugs by those users that do not fear bugs or crashes. If you want a stable HTPC then please install a stable build instead. <b><u>Always backup before using one of these builds.</u></b>
            </Text>
            <Text component={TextVariants.p}>
Be sure to read the following pages before trying these out: <Link to="http://kodi.wiki/view/development_builds">Development builds</Link>, <Link to="http://kodi.wiki/view/HOW-TO:Help_with_quality_assurance_testing">Quality assurance testing</Link>, and <Link to="http://kodi.wiki/view/HOW-TO:Submit_a_bug_report">How to submit a bug report</Link>.
            </Text>
        </TextContent>
    )
}

function DevelopmentText(props){
    return (
        <TextContent>
            <Text component={TextVariants.p}>
These development builds, often called “pre-release” builds, are what will eventually lead to the final version. <b>THESE BUILDS ARE UNSTABLE</b> and are for users that do not fear bugs or possibly crashes. If you want a stable HTPC then please install a stable build instead. <b><u>Always backup before using a development build.</u></b>
            </Text>
            <Text component={TextVariants.p}>
<b>Snapshots</b> are semi-stable nightly snapshots of the current development version. They are a step between (often) unstable nightly builds and stable release builds, though they can sometimes still be a bit unstable.
            </Text>
            <Text component={TextVariants.p}>
<b>Nightly builds</b> are made on a daily basis and contain the most recent changes. These should be considered unstable for daily usage and should only be used for to help us find possible issues.
            </Text>
            <Text component={TextVariants.p}>
Be sure to read the following pages before trying these out: <Link to="http://kodi.wiki/view/development_builds">Development builds</Link>, <Link to="http://kodi.wiki/view/HOW-TO:Help_with_quality_assurance_testing">Quality assurance testing</Link>, and <Link to="http://kodi.wiki/view/HOW-TO:Submit_a_bug_report">How to submit a bug report</Link>.
            </Text>
        </TextContent>
    )
}

function Description(props) {
    if (props.description !== null){
        return (
        <TextContent>
            <Text component={TextVariants.p}>
                <p>{props.description}</p>
            </Text>
        </TextContent>
        )
    } else if (props.release === 'prerelease') {
        return (
            <PrereleaseText />
        )
    } else if (props.release === 'development') {
        return (
            <DevelopmentText />
        )    
    }
}

function DownloadLinks(props) {
    if (props.downloads === null){
        return null
    }
    return(
        <React.Fragment>
        <TextContent>
            <Text component={TextVariants.h3}>Downloads</Text>
        </TextContent>
        <List variant={ListVariant.inline}>
            {props.downloads.map((download, index) => {
                return (
                    <ListItem>
                        <Button component="a" href={download.url} target="_blank" variant="primary">
                            {download.name}
                        </Button>
                    </ListItem>
                )
            })}
        </List>
        </React.Fragment>        
    )
}

class ReleasesTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 0,
            isBox: true
        }
        // Toggle currently active tab
        this.handleTabClick = (event, tabIndex) => {
            this.setState({
                activeTabKey: tabIndex,
                isBox: true
            })
        }
    }


    render() {
        const releases = this.props.releases
        const {activeTabKey, isBox} = this.state;
        return (
            <div>
                <Tabs activeKey={activeTabKey} onSelect={this.handleTabClick} isBox={isBox}>
                    {releases.map((release, index) => {
                        return (
                            <Tab eventKey={index} title={release.name}>
                                <p>&nbsp;</p>
                                <Description description={release.description} release={release.id}/>
                                <p>&nbsp;</p>
                                <DownloadLinks downloads={release.downloads} />
                                <p>&nbsp;</p>
                            </Tab>
                         )
                    })}
                </Tabs>
            </div>
        );
    }
}

export default ReleasesTabs;